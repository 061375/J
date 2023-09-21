var _a;
class Constants {
}
_a = Constants;
Constants.CONTACT_ADMIN = "Please contact the administrator contact@jeremyheminger.com";
Constants.BASIC_ERROR = "An unknown error occured :: " + _a.CONTACT_ADMIN;
Constants.RETREIVAL_ERROR = "There was an error returing the data. " + _a.CONTACT_ADMIN;
Constants.DEBUGMODE = false;
Constants.JLOG = false;
Constants.IPV4ADDRESS = "";
Constants.MAILERRORS = false;
Constants.SUPPRESSALERTERROR = false;
Constants.AJAXERRORPATH = "/App_Ajax/Debug";
Constants.AJAXERRORMETHOD = "SendErrors";
Constants.ERRORSTATUS = {
    "jqXHR.status": [
        { error: 0, msg: 'Not connect. Verify Network.', email: true, alert: true },
        { error: 404, msg: 'Requested page not found. [404]', email: true, alert: true },
        { error: 500, msg: 'Internal Server Error. [500]', email: true, alert: true }
    ],
    "exception": [
        { error: 'parsererror', msg: 'Requested JSON parse failed.', email: true, alert: true },
        { error: 'timeout', msg: 'Time out error.', email: true, alert: true },
        { error: 'abort', msg: 'Ajax request aborted.', email: true, alert: true }
    ],
    "unknown": [
        { error: 'unknown', msg: 'Uncaught Error. [message] ', email: true, alert: true }
    ],
    "softerror": [
        { error: 'softerror', msg: '[message] ', email: true, alert: true }
    ]
};
// MEDIA
Constants.MEDIAPATH = "/Assets/uploads/";
Constants.IMAGEPATH = "/Assets/images/";
export { Constants };
class Public {
}
Public.ISERRORING = false;
Public.ISERRORING2 = false;
Public.SOFTERROR = false;
export { Public };
//# sourceMappingURL=init.js.map