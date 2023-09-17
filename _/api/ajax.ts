'use strict';
/** 
* @title Ajax
* @about ajax handler
* @author Jeremy Heminger <contact@jeremyheminger.com>
* @date September 6, 2023
* @last_update September 6, 2023
* 
* 
* @version 1.0.0
* */
import {Constants} from "../init.js"
import {Public} from "../init.js"
import {Callback} from "../init.js"
import * as J from '../root.js'
export default {}
// this is mostly a guide on this side as it's difficult to force the data types in JS but these data types and variables 
// will be required to be upheld on the server-side for safety and consistency
//
// NOTE -> Even Chat GPT didn't know how to do this and frankly it's not necessary. The data types will be correctly handled on the server after Nautilus version 2.0.5+
// export type AjaxData<T> = (
//     a:number,
//     a1:number,
//     a2:number,
//     a3:number,
//     b:string,
//     b1:string,
//     b2:string,
//     b3:string,
//     b4:string,
//     b5:string,
//     b6:string,
//     b7:string,
//     b8:string,
//     c:string[],
//     c1:string[],
//     c2:string[],
//     c3:string[],
//     d:number[],
//     d1:number[],
//     d2:number[],
//     d3:number[],
//     d4:number[],
//     e:number,
//     e1:number,
//     e2:number,
//     e3:number,
//     f:number[],
//     f1:number[],
//     f2:number[],
//     f3:number[],
//     g:boolean,
//     g1:boolean,
//     g2:boolean,
//     g3:boolean,
//     g4:boolean,
//     orad1:string,
//     orad2:string,
//     orad3:string,
//     orad4:string,
//     h:object
// ) => void;
/** 
 * 
 * @class Base
 * */
export class Base {
    private dataloading: boolean = false
    private throttle: boolean = false
    private contentType:string = "application/json"
    private dataType:string = "json"
    constructor(private _url: string, options:any = {})
    {
        if(options.hasOwnProperty("contentType")){
            this.contentType = options?.contentType
        }
        if(options.hasOwnProperty("dataType")){
            this.dataType = options?.dataType
        }
    }
    /**
     * 
     * @param method 
     * @param data 
     * @param callback  
     * @returns 
     */
    public get<T>(method: string, data:object = {} as object,callback:Callback<string> = () => {})
    {
        if(this.dataloading && this.throttle)
            return
        // if somethigns wrong then stop here
        if(Public.ISERRORING || method == "SendErrors")
            return
          
        // preformat Oracle dates
            // Iterate through the object's keys
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  // Check if the key matches od1, od2, od3, or od4
                  if (key.startsWith("orad")) {
                    // Call the Helpers.DTDateToOracle function and replace the value
                    data[key] = J.Root.DTDateToOracle(data[key]);
                  }
                }
              }
        this.dataloading = true
        if(this.dataType == "json")
        {
            this.getData(this._url + method, {
                data:(undefined === data ? {} : data)
            })
            .then(response => {
                this.dataloading = false
                this.throttle = false
                if (response?.update == 1)
                    J.$('#updatemessage').addClass('show')
                if (response?.update == 2){
                    console.log("update !!!!!")
                    window.location.reload();
                }
                if (response?.update == 3){
                    console.log("error !!!", "The program threw an error that is causing the system to request that all server requests stop or the admin has requested that the server stop making requests")
                    Public.ISERRORING = true
                }
                //
                if (undefined !== response?.redirect && response?.redirect != '' && null != response?.redirect){
                    window.location = response?.redirect;
                    return;
                }
                //console.log(response)
                if (response?.success == 1) {
                    if(typeof callback === 'function'){
                        if(response.allowstring)
                            callback(response?.message)
                        else callback(JSON.parse(response?.message))
                    }
                    return
                }
                if(response?.softerror === undefined )
                {
                    Public.ISERRORING = true 
                    return
                }
                if(response.softerror == 1)
                {
                    if(typeof callback === 'function') {
                        callback(response?.message)
                    }
                    return
                }
                if (response?.errors !== undefined && response?.errors !== null) {
                    var errors = "";
                    Object.entries(response.errors).forEach(([k, v]) => {
                        errors += v + "\n";
                    })
                    //ErrorHandler($, msg, jqXHR, exception, source, lineNo, columnNo, error)
                    if(!Constants.SUPPRESSALERTERROR)
                        J.Debug.ErrorHandler("An Ajax error occured [1] " ,errors)
                } else {
                    if(!Constants.SUPPRESSALERTERROR)
                    J.Debug.ErrorHandler("An Ajax error occured [2] ", response?.message);
                    Public.ISERRORING = true;
                }
            })
            .catch(error =>{
                this.dataloading = false
                this.throttle = false
                // handle error TODO
                J.Debug.ErrorHandler(error)
            })
        }else{
            this.getJsonPData(this._url, {
                data:(undefined === data ? {} : data)
            })
            .then(response => {
                this.dataloading = false
                this.throttle = false
                if(typeof callback === 'function')
                    callback(response)
            })
            .catch(error =>{
                this.dataloading = false
                this.throttle = false
                // handle error TODO
                J.Debug.ErrorHandler(error)
            })
        }
        
    }
    /**
     * 
     * @param url 
     * @param data 
     * @returns 
     */
    getData(url: string, data:object)
    {
        return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", this.contentType);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("X-MainPage-Hash", J.$('#ajaxhash').val().get());
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(JSON.parse(response?.d));
                    } else {
                        const error = new Error("Request failed with status: " + xhr.status);
                        reject(error);
                    }
                }
            };
            try {
                xhr.send(JSON.stringify(data));
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * 
     * @param url 
     * @param data 
     * @returns 
     */
    getJsonPData(url: string, data: object) {
        return new Promise<string>((resolve, reject) => {
            // Create a random callback function name to avoid conflicts
            const callbackName = 'jsonpCallback_' + Math.random().toString(36).substr(2, 9);
            // make sure URL has a transition to query string
            if(url.indexOf("?") == -1)
                url += "?"
            // Add a script element to the DOM with the URL and callback
            const script = document.createElement('script');
            script.src = `${url}&callback=${callbackName}&data=${JSON.stringify(data)}`;
            document.body.appendChild(script);
        
            // Define the JSONP callback function
            window[callbackName] = (response: string) => {
                // Clean up by removing the script element and the callback function
                document.body.removeChild(script);
                delete window[callbackName];
        
                // Resolve or reject the promise based on the response
                if (response) {
                    resolve(response);
                } else {
                    const error = new Error('JSONP request failed');
                    reject(error);
                }
            };
        });
      }
      
    ///
    ///
    /// SETTERS
    ///
    ///
    SetThrottle()
    {
        this.throttle = true
    }
}
/**
 * check for active ajax requests
 * @returns number
 */
const activeAjaxRequests = (function(send) {
    var active_requests = 0;
    XMLHttpRequest.prototype.send = function(body) {
        active_requests++;
        this.addEventListener("readystatechange", function() {
            if(this.readyState === 4) active_requests--;
        });
        send.call(this, body);
    };
    return ()=>active_requests;
})(XMLHttpRequest.prototype.send);