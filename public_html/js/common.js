/* 
    Created on : Sep 22, 2017, 09:43:05 AM
    Author     : axtros
    Közös függvények, amelyek mindenféle eszközön használhatóak.
*/

var BROWSER_CHROME_NAME = 'Chrome';
var BROWSER_FIREFOX_NAME = 'Firefox';
var BROWSER_IE_NAME = 'Microsoft Internet Explorer';
var BROWSER_EDGE_NAME = 'Microsoft Edge';
var BROWSER_OPERA_NAME = 'Opera';
var BROWSER_SAFARI_NAME = 'Safari';

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;                       //a felhasználó által használt böngésző neve
var fullVersion  = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

function initClientMetadatas() {    
    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
        browserName = BROWSER_OPERA_NAME;
        fullVersion = nAgt.substring(verOffset+4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = BROWSER_OPERA_NAME;
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = BROWSER_IE_NAME;
        fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = BROWSER_CHROME_NAME;
        fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = BROWSER_SAFARI_NAME;
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = BROWSER_FIREFOX_NAME;
        fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
    {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion,10);
    }
}

/**
 * Nincs használva. (Ne töröld ki, lehet, hogy később kelleni fog!)
 * @returns {String}
 */
function browserDetect() {
    //https://stackoverflow.com/questions/38373340/how-to-get-browser-name-using-jquery-or-javascript
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
        
    if(isChrome) {
        return BROWSER_CHROME_NAME;
    } else if(isIE) {
        return BROWSER_IE_NAME;
    } else if(isFirefox) {
        return BROWSER_FIREFOX_NAME;
    } else if(isEdge) {
        return BROWSER_EDGE_NAME;
    } else if(isSafari) {
        return BROWSER_SAFARI_NAME;
    } else if(isOpera) {
        return BROWSER_OPERA_NAME;
    } else 
        return 'na';
}