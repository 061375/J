export type Callback<T> = (data: any) => void;
export class Constants
{ 

      static readonly CONTACT_ADMIN       :string = "Please contact the administrator contact@jeremyheminger.com";
      static readonly BASIC_ERROR         :string = "An unknown error occured :: " + this.CONTACT_ADMIN;
      static readonly RETREIVAL_ERROR     :string = "There was an error returing the data. " + this.CONTACT_ADMIN;

      static readonly DEBUGMODE           :boolean = false;
      
      static readonly JLOG                :boolean = false;
      static readonly IPV4ADDRESS         :string =  "";
      static readonly MAILERRORS          :boolean = false;
      static readonly SUPPRESSALERTERROR  :boolean = false;
      static readonly AJAXERRORPATH       :string = "/App_Ajax/Debug";
      static readonly AJAXERRORMETHOD    :string = "SendErrors";

      static readonly ERRORSTATUS         :object = {
            "jqXHR.status"   : [
                  {error:0,msg:'Not connect. Verify Network.',email:true,alert:true},
                  {error:404,msg:'Requested page not found. [404]',email:true,alert:true},
                  {error:500,msg:'Internal Server Error. [500]',email:true,alert:true}
            ],
            "exception"      : [
                  {error:'parsererror',msg:'Requested JSON parse failed.',email:true,alert:true},
                  {error:'timeout',msg:'Time out error.',email:true,alert:true},
                  {error:'abort',msg:'Ajax request aborted.',email:true,alert:true}
            ],
            "unknown"        : [
                  {error:'unknown',msg:'Uncaught Error. [message] ',email:true,alert:true}
            ],
            "softerror"      : [
                  {error:'softerror',msg:'[message] ',email:true,alert:true}
            ]
      };

      // MEDIA
      static readonly MEDIAPATH           :string = "/Assets/uploads/";
      static readonly IMAGEPATH           :string = "/Assets/images/";

      // Errors that can be allowed without notification
      static readonly ALLOWED_EXCEPTIONS : [
            'ResizeObserver loop limit exceeded'
      ];
} 
export class Public {
    static ISERRORING          :boolean = false;
    static ISERRORING2         :boolean = false;
    static SOFTERROR           :boolean = false;
}