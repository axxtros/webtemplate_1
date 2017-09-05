/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var BROWSER_CHROME_NAME = 'Chrome';
var BROWSER_IE_NAME = 'Microsoft Internet Explorer';
var BROWSER_FIREFOX_NAME = 'Firefox';
var BROWSER_OPERA_NAME = 'Opera';
var BROWSER_SAFARI_NAME = 'Safari';

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;                       //a felhasználó által használt böngésző neve
var fullVersion  = ''+parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset, verOffset, ix;
    
var scrolled;
var parallax_image_y_1 = 0;         //az első parallax kép mindig 0
var parallax_image_y_2 = 300;       //ezek viszonyszámok, fontos, hogy mekkora tartalom van felettük, és ha változik az oldal nagysága, akkor ezeket a számokat utánuk kell állítani,
                                    //annak érdekében, hogy a görgetett parallax képek 'nagyjából' középen legyenek a görgetési tartalom fókuszában (képernyő közepében)
var parallax_bg_speed = 0.2;
var page_header_height = 60;

var lynxstudio_username_cookie_name =  'LYNXSTUDIO_USERNAME';
var lynxstudio_password_cookie_name =  'LYNXSTUDIO_PASSWORD';
var lynxstudio_remcheckbox_cookie_name =  'LYNXSTUDIO_REMEMBER_CHCKBOX';
var lynxstudio_cookie_notification_cookie_name =  'LYNXSTUDIO_COOCKIE_NOTIFICATION_DISSMISSED';
var cookie_expires_days = 365;

function initLoginPage() {    
    initClientMetadatas();
    initParallaxBgImages();
    initLoginForm();
    initCoockieNotificationBlock();
    //console.log(navigator);         //kliens adatok lekérdezése (pl.: használt operációs rendszer, nyelv, stb.)
}

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
 * Nincs használva.
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
        return 'chrome';
    } else if(isIE) {
        return 'explorer';
    } else if(isFirefox) {
        return 'firefox';
    } else if(isEdge) {
        return 'edge';
    } else if(isSafari) {
        return 'safari';
    } else if(isOpera) {
        return 'opera';
    } else 
        return 'na';
}

/**
 * Beállítja, hogy az egyes parallax képek honnan kezdejenk el scrollozódni, a helyes - közép - megjelenítés érdekében.
 * @returns {undefined}
 */
function initParallaxBgImages() {
    $('.first-parallax').css({'background-position-y':0 + 'px'});    
    $('.second-parallax').css({'background-position-y':parallax_image_y_2 + 'px'});
}

/**
 * Kiolvassa a cookie-ból a felhasználó nevet, jelszót, és az emlékezz rám checkbox értékét, ha van, és kitölti az értékekkel a mezőket.
 * @returns {undefined}
 */
function initLoginForm() {
    //https://github.com/carhartl/jquery-cookie        
    var username = $.cookie(lynxstudio_username_cookie_name);
    var password = $.cookie(lynxstudio_password_cookie_name);
    var remembermeCheckBox = $.cookie(lynxstudio_remcheckbox_cookie_name);
    
    username !== 'null' ? $("#login-text-input").val(username) : $("#login-text-input").val('');
    password !== 'null' ? $("#password-text-input").val(password) : $("#password-text-input").val('');
    remembermeCheckBox === "true" ? $("#remember-me-chckbox").prop('checked', true) : $("#remember-me-chckbox").prop('checked', false);    
}

/**
 * Ha még nincs bent az oldaltól a 'lynxstudio_cookie_notification_cookie_name' cookie a böngészőtárban, akkor az EU-s adatvádelmi törvények miatt kötelezően feljön az oldal
 * alján egy cookie figyelmeztető fix div.
 * @returns {undefined}
 */
function initCoockieNotificationBlock() {    
    var coockieNotificationDissmissed = $.cookie(lynxstudio_cookie_notification_cookie_name);
    if(typeof coockieNotificationDissmissed === 'undefined' || coockieNotificationDissmissed === 'no') {
        $('.cookie-notification-base').slideDown(1000, function() {
            // Animation complete.
        });
    }
}

/**
 * Felhasználó elfogadta a coockie-kra vonatkozó használatot.
 * @returns {undefined}
 */
function userAgreeCoockieNotification() {
    $.cookie(lynxstudio_cookie_notification_cookie_name, 'yes', { expires : cookie_expires_days });
    $('.cookie-notification-base').slideUp(1000, function() {
        // Animation complete.
    });
}

/*
 * Globális függvény.
 * Háttérkép(ek) parallax animációja, ha kell akkor itt programozd le.
 * @returns {undefined}
 */
(function(){    
    window.onscroll = function(){
        scrolled = $(window).scrollTop();
        
        //NE TÖRÖLD KI!!!
        //ez az általános, amely mindegyik egyformán mozgatja
//        $('.parallax').css('background-position-y', -(scrolled * 0.2) + 'px');      //a 0.2 egy viszonyszám, amelyet az éppen alkalmazott képekhez kell igazítani

        var parallax_image_scroll_y_1 = parallax_image_y_1 - (scrolled * parallax_bg_speed);
        $('.first-parallax').css('background-position-y', parallax_image_scroll_y_1 + 'px');
        
        var parallax_image_scroll_y_2 = parallax_image_y_2 - (scrolled * parallax_bg_speed);
        $('.second-parallax').css('background-position-y', parallax_image_scroll_y_2 + 'px');        
    };
})();

/*
 * A parallax weboldalon a menüpont választás után az adott tartalomrészhez scrollozik animáltan.
 */
function scrollToContent(anchorTag) {        
    if(browserName !== BROWSER_FIREFOX_NAME) {             //azért, mert FF alatt az event nincs felinicializálva és kezelve, de ott nincs rá szükség
        event.preventDefault();             //ne hívódjon meg az anchor default esemény, a lap tetejére ugrás (FF alatt nincs automatikusan felinicializálva az event!!!)
    }            
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top - page_header_height}, 500);    //a 60 a felső fix menüsor height miatt kell bele, a body top padding-ja (css: --header-width-g)!
    return false;
}

function loginAction() {
    rememberMeAction();
}

function rememberMeAction() { 
    //https://github.com/carhartl/jquery-cookie
    if ($('#remember-me-chckbox').prop('checked')) {
        var username = $('#login-text-input').prop("value");
        var password = $('#password-text-input').prop("value");
        $.cookie(lynxstudio_username_cookie_name, username, { expires : cookie_expires_days });
        $.cookie(lynxstudio_password_cookie_name, password, { expires : cookie_expires_days });
        $.cookie(lynxstudio_remcheckbox_cookie_name, true, { expires : cookie_expires_days });
    } else {
        $.cookie(lynxstudio_username_cookie_name, null);
        $.cookie(lynxstudio_password_cookie_name, null);
        $.cookie(lynxstudio_remcheckbox_cookie_name, null);
    }
}