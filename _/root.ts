'use strict';
import {Constants} from "./init.js";
import {Public} from "./init.js";
import {Callback} from "./init.js";
import * as Ajax from "./api/ajax.js"; 
export default {}
/** 
 * 
 * @class Root 
 * */
export class Root {
    private $domo:any = []
    private dom_i:number = -1
    private _exists:boolean = true
    constructor(private t:string,private $t:any,private is_itterable:boolean)
    {
        //console.log(this.$t,this.$t.length)
        if(undefined === this.$t || null === this.$t || this.$t.length == 0)
            this._exists = false
    }
    ///
    ///
    /// START CORE DOM API METHODS ------------------------------
    ///
    ///
    /**
     * 
     * @param data 
     */
    append(data:any)
    {
        const parser = new DOMParser()
        if(!this.checkMissingError())return this
        if(this.dom_i > -1) {
            if (this.is_itterable)
                this.$t[this.dom_i]?.appendChild(parser.parseFromString(data, 'text/html').body.firstChild)
        } else
            if (this.is_itterable) {
                for(let i=0;i<this.$t.length;i++)
                    this.$t[i]?.appendChild(parser.parseFromString(data, 'text/html').body.firstChild)
            } else this.$t?.appendChild(parser.parseFromString(data, 'text/html').body.firstChild)
        return this
    }
    /**
     * 
     * @param key 
     * @param value 
     * @returns 
     */
    attr(key:string, value:any="")
    {
        if(!this.checkMissingError())return this
        if(value.length > 0)
        {
            if(this.dom_i > -1) {
                this.$t[this.dom_i]?.setAttribute(key, value)
            } else
                if(this.is_itterable){
                    for(let i=0;i<this.$t.length;i++)
                        this.$t[i]?.setAttribute(key, value)
                } else this.$t?.setAttribute(key, value)
        }else{
            if(this.dom_i > -1) {
                this.$domo[this.dom_i] = this.$t[this.dom_i]?.getAttribute(key)
            } else
                if(this.is_itterable){
                    for(let i=0;i<this.$t.length;i++)
                        this.$domo[i] = this.$t[i]?.getAttribute(key)
                } else this.$domo = this.$t?.getAttribute(key)
        }
        //this.dom_i = -1
        return this
    }
    /**
     * 
     * @param key 
     * @param value 
     * @returns 
     */
    css(key:string,value:string)
    {
        if(!this.checkMissingError())return this
        if(value.length > 0) {
            if(this.dom_i > -1) {
                this.$t[this.dom_i].style[key] = value
            } else {
                if(this.is_itterable) {
                    for(let i=0;i<this.$t.length;i++)
                        this.$t[i].style[key] = value
                } else this.$t.style[key] = value
            }
        }else{
            if(this.dom_i > -1) {
                this.$t[this.dom_i] = this.$t[this.dom_i]?.style?.[key]
            } else {
                if(this.is_itterable) {
                    for(let i=0;i<this.$t.length;i++)
                        this.$t[i] = this.$t[i]?.style?.[key]
                } else this.$t = this.$t?.style?.[key]
            }
        }
        //this.dom_i = -1
        return this
    } 
    /**
     * 
     * @param key 
     * @param value 
     * @returns 
     */
    data(key:string, value:any="")
    {
        if(!this.checkMissingError())return this
        if(value.length > 0) {
            if(this.dom_i > -1) {
                this.$t[this.dom_i].dataset[key] = value
            } else {
                if(this.is_itterable) {
                    for(let i=0;i<this.$t.length;i++)
                        this.$domo[i].dataset[key] = value
                } else this.$domo.dataset[key] = value
            }
        }else{
            if(this.dom_i > -1) {
                this.$t[this.dom_i] = this.$t[this.dom_i]?.dataset?.[key]
            } else {
                if(this.is_itterable) {
                    for(let i=0;i<this.$t.length;i++)
                        this.$domo[i] = this.$t[i]?.dataset?.[key]
                } else this.$domo = this.$t?.dataset?.[key]
            }
        }
        //this.dom_i = -1
        return this
    }
    /**
     * 
     * @param callback 
     * @returns 
     */
    each(callback:Callback<any>)
    {
        if(!this.checkMissingError())return this
        if(this.dom_i > -1) {
            if (this.is_itterable)
                for(let i=0;i<this.$t[this.dom_i].length;i++){
                    this.dom_i = i
                    callback(this)
                }
        } else
            if (this.is_itterable)
                for(let i=0;i<this.$t.length;i++){
                    this.dom_i = i
                    callback(this)
                }
        this.dom_i = -1
        return this
    }
    /**
     * 
     * @param n 
     * @returns 
     */
    eq(n:number)
    {
        if(!this.checkMissingError())return this
        if(this.dom_i > -1) {
            this.$t[this.dom_i] = this.$t[this.dom_i][n]
        } else
            if (this.is_itterable) 
                this.$t = this.$t[n]
        //this.dom_i = -1
        return this
    }
    /**
     * 
     * @returns boolean
     */
    exists() : boolean
    {
        return this._exists
    }
    /**
     * 
     * @note as of version XXX this does not work. Looping each reset this.$t. It needs to be treated as itterable but I am not sure how
     * @param t 
     */
    find(t:string)
    {
        this.$t = $create(t)
    } 
    /**
     * 
     * @returns 
     */
    get()
    {
        return (this.dom_i == -1 ? this.$t : this.$domo)
    }
    /**
     * 
     * @param h 
     * @returns 
     */
    height(h:string = "") {
        if(!this.checkMissingError())return this
        return this.heightwidth("height",h)
    }
    /**
     * 
     * @param data 
     * @returns 
     */
    html(data:string="")
    {
        if(!this.checkMissingError())return this
        if(data.length > 0 && this.$t != null)
        {
            if(this.dom_i > -1) {
                this.$t[this.dom_i].innerHTML = data
            } else
                if(this.is_itterable){
                    for(let i=0;i<this.$t.length;i++)
                        this.$t[i].innerHTML = data
                } else this.$t.innerHTML = data
        }else{
            if(this.dom_i > -1) {
                this.$t[this.dom_i] = this.$t[this.dom_i]?.innerHTML 
            } else
                if(this.is_itterable){
                    for(let i=0;i<this.$t.length;i++)
                        this.$t[i] = this.$t[i]?.innerHTML 
                } else this.$t = this.$t?.innerHTML
        }
        //this.dom_i = -1
        return this
    }
    /**
     * 
     * @returns 
     */
    remove()
    {
        if(!this.checkMissingError())return this
        if(this.dom_i > -1) {
            if (this.is_itterable)
                this.$t[this.dom_i]?.remove()
        } else
            if (this.is_itterable) {
                for(let i=0;i<this.$t.length;i++)
                    this.$t[i]?.remove()
            } else this.$t?.remove()
        return this
    }
    /**
     * 
     * @returns 
     */
    val()
    {
        if(!this.checkMissingError())return this
        if (this.is_itterable) {
            for(let i=0;i<this.$t.length;i++)
                this.$domo[i] = this.$t[i]?.value
        } else this.$domo = this.$t?.value
        return this
    }
    /**
     * 
     * @param h 
     * @returns 
     */
    width(h:string = "") {
        if(!this.checkMissingError())return this
        return this.heightwidth("width",h)
    }
    private heightwidth(name:string,h:string="")
    {
        if(h.length > 0){
            // make sure the user input is a number followed by a string for px, em, rem ...
            const match = h.match(/^(\d+)([a-zA-Z]+)$/);
            if(match) {
                if(this.dom_i > -1) {
                    this.$t[this.dom_i].style[name] = h
                } else
                    if(this.is_itterable){
                        for(let i=0;i<this.$t.length;i++)
                            this.$t[i].style[name] = h
                    } else this.$t.style[name] = h
            }
            return this
        }
        name = name.charAt(0).toUpperCase() + name.slice(1)
        return Math.max(
            this.$t?.[`scroll${name}`],
            this.$t?.[`offset${name}`],
            this.$t?.[`client${name}`]
        )
    }
    // CLASS MODIFIERS
    /**
     * 
     * @param c 
     * @returns 
     */
    hasClass(c:string) : boolean 
    {
        if(!this.checkMissingError())return false
        if (this.$t.classList) 
            return this.$t.classList.contains(c);
        return !!this.$t.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
    }
    /**
     * 
     * @param c 
     * @returns 
     */
    addClass(c:string) 
    {
        this.classWrap(c,this.addClassWrap)
    }
    /**
     * 
     * @param c 
     * @returns 
     */
    removeClass(c: string) {
        this.classWrap(c,this.removeClassWrap)
    }
    private classWrap(c:string,func:any)
    {
        if(this.dom_i > -1) {
            if (this.is_itterable) {
                for(let i=0;i<this.$t[this.dom_i].length;i++)
                    this.dom_i = i
                    this.$t[this.dom_i] = func(this.$t[this.dom_i],c)
            } else
                this.$t[this.dom_i] = func(this.$t[this.dom_i],c)
            
        } else {
            if (this.is_itterable)
                for(let i=0;i<this.$t.length;i++)
                    this.$t[i] = func(this.$t[i],c)
            else
                this.$t = func(this.$t,c)
        }
        this.dom_i = -1
        return this
    }
    private addClassWrap($t:any, c:string)
    {
        if ($t.classList) 
            $t.classList.add(c);
        else if (!$t.hasClass(c)) 
            $t.className += c;
        
        return $t;
    }
    private removeClassWrap($t:any,c: string) {
        if ($t.classList) {
            $t.classList.remove(c);
        }else{
            if (this.hasClass(c)) {
                var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
                $t.className=$t.className.replace(reg, ' ');
            }
        }
        return $t
    }
    ///
    ///
    /// END CORE DOM METHODS -------------------------------------
    ///
    ///
    /**
     * Returns date formatted for Oracle SQL DD-MON-YY
     * @param {string} inputDate - Date formatted as MM/dd/yyyy
     * @returns {string} Formatted date in Oracle SQL format or empty string if input is not valid
     */
    static DTDateToOracle(inputDate: string) : string
    {
        return Helpers.dtdto(inputDate);
    } 
    /**
     * 
     * @param obj 
     * @param prefix 
     * @returns 
     */ 
    static buildQueryString(obj: any, prefix?: string): string
    {
        return Helpers.bqs(obj, prefix)
    }
    checkMissingError()
    {
        if(!this._exists) 
        {
            Debug.ErrorHandler("Node not found (" + this.t + ")")
            return false  
        }
        return true
    }
}
///
/// 
/// MAIN SELECTOR
/// This function selects the target NODE to act on
///
///
export var $ = function(t) {
    return $create(t)
}
function $create(t)
{
    let $t:any 
    let is_itterable:boolean = false
    if(Helpers.isID(t)){
        $t = document.querySelector(t)
    }else{
        $t = document.querySelectorAll(t)
        is_itterable = true
    }
    return new Root(t,$t,is_itterable)
}
///
///
///
///
export class Helpers {
    /**
     * 
     * @param s 
     * @returns 
     */
    static ToBool(s: any)
    {
        switch(s){
            case true:
            case "TRUE":
            case "true": 
            case "yes": 
            case "1": 
              return true;
            default: 
              return false;
        }
    }
    /**
     * 
     * @param s 
     * @returns boolean
     */
    static isID(s:string) : boolean
    {
        const regex = /^#([a-zA-Z_$][a-zA-Z\d_$]*)$/;
        return regex.test(s);
    }

    ///
    ///
    /// WRAPPERS
    ///
    ///
    static dtdto(inputDate: string) : string {
        const months = [
            'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ];

        // Convert the input to a string
        const inputString = String(inputDate);

        // Check if the input is not a string or doesn't contain slashes
        if (typeof inputString !== 'string' || inputString.indexOf('/') == -1) {
            return ''; // Return empty string for invalid input
        }

        const dateParts = inputString.split('/');
        
        // Check if the input date has exactly 3 parts (month, day, year)
        if (dateParts.length !== 3) {
            return ''; // Return empty string for invalid input
        }

        const month = parseInt(dateParts[0]);
        const day = parseInt(dateParts[1]);
        const year = parseInt(dateParts[2]);

        // Check if month, day, and year are valid
        if (isNaN(month) || isNaN(day) || isNaN(year) ||
            month < 1 || month > 12 || day < 1 || day > 31) {
            return ''; // Return empty string for invalid input
        }

        const formattedMonth = months[month - 1];
        const formattedDay = (day < 10) ? '0' + day : day;
        const formattedYear = year.toString().substring(2);

        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    } 
    static bqs(obj: any, prefix?: string): string {
        const parts = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value !== null && value !== undefined) {
                    const newKey = prefix ? prefix + '[' + key + ']' : key;
                    if (typeof value === 'object') {
                        parts.push(Helpers.bqs(value, newKey));
                    } else {
                        parts.push(encodeURIComponent(newKey) + '=' + encodeURIComponent(value));
                    }
                }
            }
        }
        return parts.join('&');
    }  
}
export class Cookie 
{
    /**
     * 
     * @param name 
     * @returns 
     */
    static get(name: string) : any {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    /**
     * 
     * @param name 
     * @param value 
     * @param expires 
     * @param path 
     * @param domain 
     * @param secure 
     */
    static set(name, value, expires, path, domain, secure) {
      let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (expires instanceof Date) {
        cookieText += `; expires=${expires.toString()}`;
      }
  
      if (path) cookieText += `; path=${path}`;
      if (domain) cookieText += `; domain=${domain}`;
      if (secure) cookieText += `; secure`;
  
      document.cookie = cookieText;
    }
    /**
     * 
     * @param name 
     * @param path 
     * @param domain 
     * @param secure 
     */
    static remove(name, path, domain, secure) {
      Cookie.set(name, '', new Date(0), path, domain, secure);
    }
}
export class Debug
{
    /**
     * 
     * @param msg 
     * @param error 
     * @returns 
     */
    static ErrorHandler(msg:string, error:string = "") : void {
        Public.ISERRORING = true
        
        if(Debug.AllowedExceptions(msg))
            return

        console.log("ErrorHandler ",msg, error)
        var email = false;
        if (Public.SOFTERROR) {
            msg = Constants.ERRORSTATUS['softerror'][0].msg.replace('[message]', msg)
            if(Constants.ERRORSTATUS['softerror'][0].alert && !Public.ISERRORING2){
                alert(msg + " " + error)
            }
            if(Constants.ERRORSTATUS['softerror'][0].email)
               email = true ; 
            Public.SOFTERROR = false;
        }
        else {
            msg += Constants.ERRORSTATUS['unknown'][0].msg + " ";
            msg = msg.replace('[message]', error)
            if(Constants.ERRORSTATUS['unknown'][0].alert && !Public.ISERRORING2)
                alert("[10] " + msg);
            if(Constants.ERRORSTATUS['unknown'][0].email)
               email = true ;        
        }
        
        msg = document.getElementsByTagName("title")[0].innerHTML + " --> " + msg;

        if(email)
            Debug.SendErrors(msg, error);
    }
    /** 
     * @param {string} error
     * */
    static AllowedExceptions(error: string)
    {
        console.log('AllowedExceptions',error)
        if(error === undefined)
            return true
        for(let i=0;i<Constants.ALLOWED_EXCEPTIONS.length;i++)
            if(typeof error === 'string')
                if(error?.indexOf(Constants.ALLOWED_EXCEPTIONS[i]) > -1)
                    return true 
        return false
    }
    /**
     * 
     * @param msg 
     * @param source 
     * @param lineNo 
     * @param columnNo 
     * @param error 
     * @returns 
     */
    static SendErrors(msg, error) : void
    {
        if(Public.ISERRORING2)
            return;
        Public.ISERRORING2 = true;
        let scripts: string[] = [];
        let scr: HTMLScriptElement[] = Array.from(
            document.getElementsByTagName("script")
        ) as HTMLScriptElement[];
        for(let i=0; i<scr.length;i++)
            scripts.push(scr[i].src)
        let a = new Ajax.Base(Constants.AJAXERRORPATH) 
        a.get(Constants.AJAXERRORMETHOD,{ 
            log: JSON.stringify({
            msg:msg,
            error:error,
            scripts:scripts})
        }, function (message) {
            console.log(message);
        });
    }
}
declare global {
    interface HTMLElement {

    }
  }