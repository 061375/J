'use strict';
import { Constants } from "./init.js";
import { Public } from "./init.js";
import * as Ajax from "./api/ajax.js";
export default {};
/**
 *
 * @class Root
 * */
export class Root {
    constructor(t, $t, is_itterable) {
        this.t = t;
        this.$t = $t;
        this.is_itterable = is_itterable;
        this.$domo = [];
        this.dom_i = -1;
        this._exists = true;
        //console.log(this.$t,this.$t.length)
        if (undefined === this.$t || null === this.$t || this.$t.length == 0)
            this._exists = false;
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
    append(data) {
        var _a, _b, _c;
        const parser = new DOMParser();
        if (!this.checkMissingError())
            return this;
        if (this.dom_i > -1) {
            if (this.is_itterable)
                (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.appendChild(parser.parseFromString(data, 'text/html').body.firstChild);
        }
        else if (this.is_itterable) {
            for (let i = 0; i < this.$t.length; i++)
                (_b = this.$t[i]) === null || _b === void 0 ? void 0 : _b.appendChild(parser.parseFromString(data, 'text/html').body.firstChild);
        }
        else
            (_c = this.$t) === null || _c === void 0 ? void 0 : _c.appendChild(parser.parseFromString(data, 'text/html').body.firstChild);
        return this;
    }
    /**
     *
     * @param key
     * @param value
     * @returns
     */
    attr(key, value = "") {
        var _a, _b, _c, _d, _e, _f;
        if (!this.checkMissingError())
            return this;
        if (value.length > 0) {
            if (this.dom_i > -1) {
                (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.setAttribute(key, value);
            }
            else if (this.is_itterable) {
                for (let i = 0; i < this.$t.length; i++)
                    (_b = this.$t[i]) === null || _b === void 0 ? void 0 : _b.setAttribute(key, value);
            }
            else
                (_c = this.$t) === null || _c === void 0 ? void 0 : _c.setAttribute(key, value);
        }
        else {
            if (this.dom_i > -1) {
                this.$domo[this.dom_i] = (_d = this.$t[this.dom_i]) === null || _d === void 0 ? void 0 : _d.getAttribute(key);
            }
            else if (this.is_itterable) {
                for (let i = 0; i < this.$t.length; i++)
                    this.$domo[i] = (_e = this.$t[i]) === null || _e === void 0 ? void 0 : _e.getAttribute(key);
            }
            else
                this.$domo = (_f = this.$t) === null || _f === void 0 ? void 0 : _f.getAttribute(key);
        }
        //this.dom_i = -1
        return this;
    }
    /**
     *
     * @param key
     * @param value
     * @returns
     */
    css(key, value) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.checkMissingError())
            return this;
        if (value.length > 0) {
            if (this.dom_i > -1) {
                this.$t[this.dom_i].style[key] = value;
            }
            else {
                if (this.is_itterable) {
                    for (let i = 0; i < this.$t.length; i++)
                        this.$t[i].style[key] = value;
                }
                else
                    this.$t.style[key] = value;
            }
        }
        else {
            if (this.dom_i > -1) {
                this.$t[this.dom_i] = (_b = (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b[key];
            }
            else {
                if (this.is_itterable) {
                    for (let i = 0; i < this.$t.length; i++)
                        this.$t[i] = (_d = (_c = this.$t[i]) === null || _c === void 0 ? void 0 : _c.style) === null || _d === void 0 ? void 0 : _d[key];
                }
                else
                    this.$t = (_f = (_e = this.$t) === null || _e === void 0 ? void 0 : _e.style) === null || _f === void 0 ? void 0 : _f[key];
            }
        }
        //this.dom_i = -1
        return this;
    }
    /**
     *
     * @param key
     * @param value
     * @returns
     */
    data(key, value = "") {
        var _a, _b, _c, _d, _e, _f;
        if (!this.checkMissingError())
            return this;
        if (value.length > 0) {
            if (this.dom_i > -1) {
                this.$t[this.dom_i].dataset[key] = value;
            }
            else {
                if (this.is_itterable) {
                    for (let i = 0; i < this.$t.length; i++)
                        this.$domo[i].dataset[key] = value;
                }
                else
                    this.$domo.dataset[key] = value;
            }
        }
        else {
            if (this.dom_i > -1) {
                this.$t[this.dom_i] = (_b = (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b[key];
            }
            else {
                if (this.is_itterable) {
                    for (let i = 0; i < this.$t.length; i++)
                        this.$domo[i] = (_d = (_c = this.$t[i]) === null || _c === void 0 ? void 0 : _c.dataset) === null || _d === void 0 ? void 0 : _d[key];
                }
                else
                    this.$domo = (_f = (_e = this.$t) === null || _e === void 0 ? void 0 : _e.dataset) === null || _f === void 0 ? void 0 : _f[key];
            }
        }
        //this.dom_i = -1
        return this;
    }
    /**
     *
     * @param callback
     * @returns
     */
    each(callback) {
        if (!this.checkMissingError())
            return this;
        if (this.dom_i > -1) {
            if (this.is_itterable)
                for (let i = 0; i < this.$t[this.dom_i].length; i++) {
                    this.dom_i = i;
                    callback(this);
                }
        }
        else if (this.is_itterable)
            for (let i = 0; i < this.$t.length; i++) {
                this.dom_i = i;
                callback(this);
            }
        this.dom_i = -1;
        return this;
    }
    /**
     *
     * @param n
     * @returns
     */
    eq(n) {
        if (!this.checkMissingError())
            return this;
        if (this.dom_i > -1) {
            this.$t[this.dom_i] = this.$t[this.dom_i][n];
        }
        else if (this.is_itterable)
            this.$t = this.$t[n];
        //this.dom_i = -1
        return this;
    }
    /**
     *
     * @returns boolean
     */
    exists() {
        return this._exists;
    }
    /**
     *
     * @note as of version XXX this does not work. Looping each reset this.$t. It needs to be treated as itterable but I am not sure how
     * @param t
     */
    find(t) {
        this.$t = $create(t);
    }
    /**
     *
     * @returns
     */
    get() {
        return (this.dom_i == -1 ? this.$t : this.$domo);
    }
    /**
     *
     * @param h
     * @returns
     */
    height(h = "") {
        if (!this.checkMissingError())
            return this;
        return this.heightwidth("height", h);
    }
    /**
     *
     * @param data
     * @returns
     */
    html(data = "") {
        var _a, _b, _c;
        if (!this.checkMissingError())
            return this;
        if (data.length > 0 && this.$t != null) {
            if (this.dom_i > -1) {
                this.$t[this.dom_i].innerHTML = data;
            }
            else if (this.is_itterable) {
                for (let i = 0; i < this.$t.length; i++)
                    this.$t[i].innerHTML = data;
            }
            else
                this.$t.innerHTML = data;
        }
        else {
            if (this.dom_i > -1) {
                this.$t[this.dom_i] = (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.innerHTML;
            }
            else if (this.is_itterable) {
                for (let i = 0; i < this.$t.length; i++)
                    this.$t[i] = (_b = this.$t[i]) === null || _b === void 0 ? void 0 : _b.innerHTML;
            }
            else
                this.$t = (_c = this.$t) === null || _c === void 0 ? void 0 : _c.innerHTML;
        }
        //this.dom_i = -1
        return this;
    }
    /**
     *
     * @returns
     */
    remove() {
        var _a, _b, _c;
        if (!this.checkMissingError())
            return this;
        if (this.dom_i > -1) {
            if (this.is_itterable)
                (_a = this.$t[this.dom_i]) === null || _a === void 0 ? void 0 : _a.remove();
        }
        else if (this.is_itterable) {
            for (let i = 0; i < this.$t.length; i++)
                (_b = this.$t[i]) === null || _b === void 0 ? void 0 : _b.remove();
        }
        else
            (_c = this.$t) === null || _c === void 0 ? void 0 : _c.remove();
        return this;
    }
    /**
     *
     * @returns
     */
    val() {
        var _a, _b;
        if (!this.checkMissingError())
            return this;
        if (this.is_itterable) {
            for (let i = 0; i < this.$t.length; i++)
                this.$domo[i] = (_a = this.$t[i]) === null || _a === void 0 ? void 0 : _a.value;
        }
        else
            this.$domo = (_b = this.$t) === null || _b === void 0 ? void 0 : _b.value;
        return this;
    }
    /**
     *
     * @param h
     * @returns
     */
    width(h = "") {
        if (!this.checkMissingError())
            return this;
        return this.heightwidth("width", h);
    }
    heightwidth(name, h = "") {
        var _a, _b, _c;
        if (h.length > 0) {
            // make sure the user input is a number followed by a string for px, em, rem ...
            const match = h.match(/^(\d+)([a-zA-Z]+)$/);
            if (match) {
                if (this.dom_i > -1) {
                    this.$t[this.dom_i].style[name] = h;
                }
                else if (this.is_itterable) {
                    for (let i = 0; i < this.$t.length; i++)
                        this.$t[i].style[name] = h;
                }
                else
                    this.$t.style[name] = h;
            }
            return this;
        }
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return Math.max((_a = this.$t) === null || _a === void 0 ? void 0 : _a[`scroll${name}`], (_b = this.$t) === null || _b === void 0 ? void 0 : _b[`offset${name}`], (_c = this.$t) === null || _c === void 0 ? void 0 : _c[`client${name}`]);
    }
    // CLASS MODIFIERS
    /**
     *
     * @param c
     * @returns
     */
    hasClass(c) {
        if (!this.checkMissingError())
            return false;
        if (this.$t.classList)
            return this.$t.classList.contains(c);
        return !!this.$t.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
    }
    /**
     *
     * @param c
     * @returns
     */
    addClass(c) {
        this.classWrap(c, this.addClassWrap);
    }
    /**
     *
     * @param c
     * @returns
     */
    removeClass(c) {
        this.classWrap(c, this.removeClassWrap);
    }
    classWrap(c, func) {
        if (this.dom_i > -1) {
            if (this.is_itterable) {
                for (let i = 0; i < this.$t[this.dom_i].length; i++)
                    this.dom_i = i;
                this.$t[this.dom_i] = func(this.$t[this.dom_i], c);
            }
            else
                this.$t[this.dom_i] = func(this.$t[this.dom_i], c);
        }
        else {
            if (this.is_itterable)
                for (let i = 0; i < this.$t.length; i++)
                    this.$t[i] = func(this.$t[i], c);
            else
                this.$t = func(this.$t, c);
        }
        this.dom_i = -1;
        return this;
    }
    addClassWrap($t, c) {
        if ($t.classList)
            $t.classList.add(c);
        else if (!$t.hasClass(c))
            $t.className += c;
        return $t;
    }
    removeClassWrap($t, c) {
        if ($t.classList) {
            $t.classList.remove(c);
        }
        else {
            if (this.hasClass(c)) {
                var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
                $t.className = $t.className.replace(reg, ' ');
            }
        }
        return $t;
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
    static DTDateToOracle(inputDate) {
        return Helpers.dtdto(inputDate);
    }
    /**
     *
     * @param obj
     * @param prefix
     * @returns
     */
    static buildQueryString(obj, prefix) {
        return Helpers.bqs(obj, prefix);
    }
    checkMissingError() {
        if (!this._exists) {
            Debug.ErrorHandler("Node not found (" + this.t + ")");
            return false;
        }
        return true;
    }
}
///
/// 
/// MAIN SELECTOR
/// This function selects the target NODE to act on
///
///
export var $ = function (t) {
    return $create(t);
};
function $create(t) {
    let $t;
    let is_itterable = false;
    if (Helpers.isID(t)) {
        $t = document.querySelector(t);
    }
    else {
        $t = document.querySelectorAll(t);
        is_itterable = true;
    }
    return new Root(t, $t, is_itterable);
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
    static ToBool(s) {
        switch (s) {
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
    static isID(s) {
        const regex = /^#([a-zA-Z_$][a-zA-Z\d_$]*)$/;
        return regex.test(s);
    }
    ///
    ///
    /// WRAPPERS
    ///
    ///
    static dtdto(inputDate) {
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
    static bqs(obj, prefix) {
        const parts = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value !== null && value !== undefined) {
                    const newKey = prefix ? prefix + '[' + key + ']' : key;
                    if (typeof value === 'object') {
                        parts.push(Helpers.bqs(value, newKey));
                    }
                    else {
                        parts.push(encodeURIComponent(newKey) + '=' + encodeURIComponent(value));
                    }
                }
            }
        }
        return parts.join('&');
    }
}
export class Cookie {
    /**
     *
     * @param name
     * @returns
     */
    static get(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2)
            return parts.pop().split(';').shift();
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
        if (path)
            cookieText += `; path=${path}`;
        if (domain)
            cookieText += `; domain=${domain}`;
        if (secure)
            cookieText += `; secure`;
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
export class Debug {
    /**
     *
     * @param msg
     * @param error
     * @returns
     */
    static ErrorHandler(msg, error = "") {
        Public.ISERRORING = true;
        if (Debug.AllowedExceptions(msg))
            return;
        console.log("ErrorHandler ", msg, error);
        var email = false;
        if (Public.SOFTERROR) {
            msg = Constants.ERRORSTATUS['softerror'][0].msg.replace('[message]', msg);
            if (Constants.ERRORSTATUS['softerror'][0].alert && !Public.ISERRORING2) {
                alert(msg + " " + error);
            }
            if (Constants.ERRORSTATUS['softerror'][0].email)
                email = true;
            Public.SOFTERROR = false;
        }
        else {
            msg += Constants.ERRORSTATUS['unknown'][0].msg + " ";
            msg = msg.replace('[message]', error);
            if (Constants.ERRORSTATUS['unknown'][0].alert && !Public.ISERRORING2)
                alert("[10] " + msg);
            if (Constants.ERRORSTATUS['unknown'][0].email)
                email = true;
        }
        msg = document.getElementsByTagName("title")[0].innerHTML + " --> " + msg;
        if (email)
            Debug.SendErrors(msg, error);
    }
    /**
     * @param {string} error
     * */
    static AllowedExceptions(error) {
        console.log('AllowedExceptions', error);
        if (error === undefined)
            return true;
        for (let i = 0; i < Constants.ALLOWED_EXCEPTIONS.length; i++)
            if (typeof error === 'string')
                if ((error === null || error === void 0 ? void 0 : error.indexOf(Constants.ALLOWED_EXCEPTIONS[i])) > -1)
                    return true;
        return false;
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
    static SendErrors(msg, error) {
        if (Public.ISERRORING2)
            return;
        Public.ISERRORING2 = true;
        let scripts = [];
        let scr = Array.from(document.getElementsByTagName("script"));
        for (let i = 0; i < scr.length; i++)
            scripts.push(scr[i].src);
        let a = new Ajax.Base(Constants.AJAXERRORPATH);
        a.get(Constants.AJAXERRORMETHOD, {
            log: JSON.stringify({
                msg: msg,
                error: error,
                scripts: scripts
            })
        }, function (message) {
            console.log(message);
        });
    }
}
//# sourceMappingURL=root.js.map