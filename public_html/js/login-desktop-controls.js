/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var BROWSER_CHROME_NAME = 'Chrome';
var BROWSER_FIREFOX_NAME = 'Firefox';
var BROWSER_IE_NAME = 'Microsoft Internet Explorer';
var BROWSER_EDGE_NAME = 'Microsoft Edge';
var BROWSER_OPERA_NAME = 'Opera';
var BROWSER_SAFARI_NAME = 'Safari';

//Parallax háttérképek scrollozás kezdetének beállítása.
//Ezek viszonyszámok, fontos, hogy mekkora tartalom van felettük, és ha változik az oldal nagysága, akkor ezeket a számokat utánuk kell állítani.
//Ezek az értékek állítják be, hogy a görgetett parallax képek középen legyenek a görgetési tartalom fókuszában (képernyő közepében).
var PARALLAX_IMAGE_1_Y_STARTPOS = 0;         //az első parallax kép mindig 0
var PARALLAX_IMAGE_2_Y_STARTPOS = 300;
var PARALLAX_IMAGE_3_Y_STARTPOS = 400;
var PARALLAX_BG_SCROLL_SPEED = 0.2;
var PARALLAX_SCROLL_TO_CONTENT_SPEED = 800;

var PAGE_HEADER_FIX_HEIGHT = 60;            //a 60 a felső fix menüsor height miatt kell bele, a body top padding-ja (css: --header-width-g)!

var LYNXSTUDIO_USERNAME_COOKIE_NAME =  'LYNXSTUDIO_USERNAME';
var LYNXSTUDIO_PASSWORD_COOKIE_NAME =  'LYNXSTUDIO_PASSWORD';
var LYNXSTUDIO_REMCHECKBOX_COOKIE_NAME =  'LYNXSTUDIO_REMEMBER_CHCKBOX';
var LYNXSTUDIO_COOKIE_NOTIFICATION_COOKIE_NAME =  'LYNXSTUDIO_COOCKIE_NOTIFICATION_DISSMISSED';
var COOKIE_EXPIRES_DAYS = 365;

var SELECTED_COLOR = '#4a8bf5';
var SELECTED_INPUT_IMG_BG_COLOR = '#719ECE';
var SUCCESS_COLOR = '#249800';
var ERROR_COLOR = '#ed3d3d';

var scrolled;
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;                       //a felhasználó által használt böngésző neve
var fullVersion  = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

function initLoginPage() {
    init();
    resetLoginForm();
    initClientMetadatas();
    initParallaxBgImages();
    initLoginForm();
    initCoockieNotificationBlock();
    //console.log(navigator);         //kliens adatok lekérdezése (pl.: használt operációs rendszer, nyelv, stb.)
}

function init() {
    $('.disabled-background-html-base').css('display', 'none');
}

/**
 * Visszaállítja a bejelentkező form-ot az eredeti css állapotába.
 * @returns {undefined}
 */
function resetLoginForm() {    
    $('#login-text-input').css('box-shadow', 'none');
    $('#login-text-input').parent().prev().css('background-color', 'transparent');
    $('#login-text-input').parent().prev().css('box-shadow', 'none');
    
    $('#password-text-input').css('box-shadow', 'none');
    $('#password-text-input').parent().prev().css('background-color', 'transparent');
    $('#password-text-input').parent().prev().css('box-shadow', 'none');        
    
    var loginPanelBaseDiv = $(".login-panel-base-div");
    if(loginPanelBaseDiv !== null) {        
        var loginErrorMessageBlock = $(".login-input-error-msg-wrapper-container");
        if(loginErrorMessageBlock !== null) {
            $(".login-error-text").text('no error message');
            $(loginErrorMessageBlock).css('display', 'none');            
        }
        $(loginPanelBaseDiv).css('height', '22.5em');
    }
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

/**
 * Beállítja, hogy az egyes parallax képek honnan kezdejenk el scrollozódni, a helyes - közép - megjelenítés érdekében.
 * @returns {undefined}
 */
function initParallaxBgImages() {
    $('.first-parallax').css({'background-position-y':PARALLAX_IMAGE_1_Y_STARTPOS + 'px'});    
    $('.second-parallax').css({'background-position-y':PARALLAX_IMAGE_2_Y_STARTPOS + 'px'});
    $('.third-parallax').css({'background-position-y':PARALLAX_IMAGE_3_Y_STARTPOS + 'px'});
}

/**
 * Kiolvassa a cookie-ból a felhasználó nevet, jelszót, és az emlékezz rám checkbox értékét, ha van, és kitölti az értékekkel a mezőket.
 * @returns {undefined}
 */
function initLoginForm() {
    //https://github.com/carhartl/jquery-cookie        
    var username = $.cookie(LYNXSTUDIO_USERNAME_COOKIE_NAME);
    var password = $.cookie(LYNXSTUDIO_PASSWORD_COOKIE_NAME);
    var remembermeCheckBox = $.cookie(LYNXSTUDIO_REMCHECKBOX_COOKIE_NAME);
    
    username !== 'null' ? $("#login-text-input").val(username) : $("#login-text-input").val('');
    password !== 'null' ? $("#password-text-input").val(password) : $("#password-text-input").val('');
    remembermeCheckBox === "true" ? $("#remember-me-chckbox").prop('checked', true) : $("#remember-me-chckbox").prop('checked', false);    
}

/**
 * Ha még nincs bent az oldaltól a 'LYNXSTUDIO_COOKIE_NOTIFICATION_COOKIE_NAME' cookie a böngészőtárban, akkor az EU-s adatvádelmi törvények miatt kötelezően feljön az oldal
 * alján egy cookie figyelmeztető fix div.
 * @returns {undefined}
 */
function initCoockieNotificationBlock() {    
    var coockieNotificationDissmissed = $.cookie(LYNXSTUDIO_COOKIE_NOTIFICATION_COOKIE_NAME);
    if(typeof coockieNotificationDissmissed === 'undefined' || coockieNotificationDissmissed === 'no') {
        $('.cookie-notification-base').slideDown(1000, function() {
            // Animation complete.
        });
    }
}

function pageResizeEvent() {
    if($('.forgot-password-base').css('display') === 'block') {
        forgetPasswordModalCalcPos();
    }
}

/**
 * Felhasználó elfogadta a coockie-kra vonatkozó használatot.
 * @returns {undefined}
 */
function userAgreeCoockieNotification() {
    $.cookie(LYNXSTUDIO_COOKIE_NOTIFICATION_COOKIE_NAME, 'yes', { expires : COOKIE_EXPIRES_DAYS });
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

        var parallax_image_scroll_y_1 = PARALLAX_IMAGE_1_Y_STARTPOS - (scrolled * PARALLAX_BG_SCROLL_SPEED);
        $('.first-parallax').css('background-position-y', parallax_image_scroll_y_1 + 'px');
        
        var parallax_image_scroll_y_2 = PARALLAX_IMAGE_2_Y_STARTPOS - (scrolled * PARALLAX_BG_SCROLL_SPEED);
        $('.second-parallax').css('background-position-y', parallax_image_scroll_y_2 + 'px');
        
        var parallax_image_scroll_y_3 = PARALLAX_IMAGE_3_Y_STARTPOS - (scrolled * PARALLAX_BG_SCROLL_SPEED);
        $('.third-parallax').css('background-position-y', parallax_image_scroll_y_3 + 'px');
    };
})();

/*
 * A parallax weboldalon a menüpont választás után az adott tartalomrészhez scrollozik animáltan.
 */
function scrollToContent(anchorTag) {        
    if(browserName !== BROWSER_FIREFOX_NAME) {             //azért, mert FF alatt az event nincs felinicializálva és kezelve, de ott nincs rá szükség
        event.preventDefault();             //ne hívódjon meg az anchor default esemény, a lap tetejére ugrás (FF alatt nincs automatikusan felinicializálva az event!!!)
    }            
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top - PAGE_HEADER_FIX_HEIGHT}, PARALLAX_SCROLL_TO_CONTENT_SPEED);
    return false;
}

function loginAction() {
    setRememberMeCookies();
    wrongLoginEvent('Hibás felhasználó név, vagy jelszó! Kérem adja meg újra!');
}

/**
 * Az 'Emlékezz rám' funkció cookie mentése.
 * @returns {undefined}
 */
function setRememberMeCookies() {
    //https://github.com/carhartl/jquery-cookie
    if ($('#remember-me-chckbox').prop('checked')) {
        var username = $('#login-text-input').prop("value");
        var password = $('#password-text-input').prop("value");
        $.cookie(LYNXSTUDIO_USERNAME_COOKIE_NAME, username, { expires : COOKIE_EXPIRES_DAYS });
        $.cookie(LYNXSTUDIO_PASSWORD_COOKIE_NAME, password, { expires : COOKIE_EXPIRES_DAYS });
        $.cookie(LYNXSTUDIO_REMCHECKBOX_COOKIE_NAME, true, { expires : COOKIE_EXPIRES_DAYS });
    } else {
        $.cookie(LYNXSTUDIO_USERNAME_COOKIE_NAME, null);
        $.cookie(LYNXSTUDIO_PASSWORD_COOKIE_NAME, null);
        $.cookie(LYNXSTUDIO_REMCHECKBOX_COOKIE_NAME, null);
    }
}

/**
 * Hibás bejelentkezés esetén ez az esemény fut le, felületi css változásokkal. Ezt a függvényt szerver oldalrról kell meghívni,
 * ha a bejelentkezés validáció nem sikerül.
 * @param {type} errorMessage A pontos hibaüzenet. [max. 50 karakter]
 * @returns {undefined}
 */
function wrongLoginEvent(errorMessage) {    
    var usernameIconWrapperElement = $("#login-text-input").parent().prev();        
    var passwordIconWrapperElement = $("#password-text-input").parent().prev();        
    if(usernameIconWrapperElement !== null && passwordIconWrapperElement !== null) {
        
        $(usernameIconWrapperElement).css('background-color', ERROR_COLOR);
        $(usernameIconWrapperElement).css('box-shadow', '0 0 10px' + ERROR_COLOR + '');
        $("#login-text-input").css('box-shadow', '0 0 10px' + ERROR_COLOR + '');
        
        $(passwordIconWrapperElement).css('background-color', ERROR_COLOR);
        $(passwordIconWrapperElement).css('box-shadow', '0 0 10px' + ERROR_COLOR + '');
        $("#password-text-input").css('box-shadow', '0 0 10px' + ERROR_COLOR + '');                
        
        var loginPanelBaseDiv = $(".login-panel-base-div");
        if(loginPanelBaseDiv !== null) {
            $(loginPanelBaseDiv).css('height', '26em');
        }
        
        var loginErrorMessageBlock = $(".login-input-error-msg-wrapper-container");
        if(loginErrorMessageBlock !== null) {
            $(".login-error-text").text(errorMessage);
            $(loginErrorMessageBlock).css('display', 'block');
        }
    }    
}

/**
 * CSS vezérlés, ha a felhasználó belekattint a bejelentkező form valamelyik input mezőjébe.
 * @param {type} inputElement
 * @param {type} isSelected True, ha az input kiválasztásra került, false, ha elveszítette a focust.
 * @returns {undefined}
 */
function onFocusLoginInputEvent(inputElement, isSelected) {    
    resetLoginForm();
    if(inputElement !== null) {
        var inputIconWrapperElement = $(inputElement).parent().prev();
        if(inputIconWrapperElement !== null) {
            if(isSelected) {                                
                $(inputElement).css('box-shadow', '0 0 10px' + SELECTED_COLOR + '');
                $(inputIconWrapperElement).css('background-color', SELECTED_INPUT_IMG_BG_COLOR);
                $(inputIconWrapperElement).css('box-shadow', '0 0 10px' + SELECTED_INPUT_IMG_BG_COLOR + '');
            } else {
                $(inputElement).css('box-shadow', 'none');
                $(inputIconWrapperElement).css('background-color', 'transparent');
                $(inputIconWrapperElement).css('box-shadow', 'none');
            }
        }
    }
}

function forgetPasswordClickEvent() {
    $('.disabled-background-html-base').css('display', 'block');
    forgetPasswordModalCalcPos();    
    $("#forgot-password-email-text-input").val('');
    $('.forgot-password-base').css('display', 'block');
    $("#forgot-password-email-text-input").focus();
}

function forgetPasswordModalCalcPos() {
    var forgetPasswordDiv = $('.forgot-password-base');
    if(forgetPasswordDiv !== null) {
        $(forgetPasswordDiv).css('height', '210px'); //240
        var bodyWidth = $('.container').width();
        var bodyOffset = $('.container').offset().left;
        var screenHeight = screen.height;
        var forgetPasswordBaseLeft = bodyOffset + ((bodyWidth / 2) - ($(forgetPasswordDiv).width() / 2));        
        var forgetPasswordBaseTop = (screenHeight / 4);
        $(forgetPasswordDiv).css('top', forgetPasswordBaseTop + 'px');
        $(forgetPasswordDiv).css('left', forgetPasswordBaseLeft + 'px');
        $('.forgot-password-email-error-msg-wrapper').css('display', 'none');
    }
}

/**
 * 
 * @param {type} isSendSuccess True, ha a művelet siekresen volt. (Ekkor zöld hátterű üzenet jelenik meg.) False, ha a művelet sikertelen volt. (Ekkor piros hátterű üzenet jelenik meg.)
 * @param {type} message A felhasználó tájékoztatására kiírandó üzenet.
 * @returns {undefined}
 */
function forgetPasswordSendEmailAddress(isSendSuccess, message) {
    var forgetPasswordDiv = $('.forgot-password-base');
    $(forgetPasswordDiv).css('height', '240px');
    if(isSendSuccess) {
        $('.forgot-password-email-error-msg').css('background-color', SUCCESS_COLOR);        
    } else {
        $('.forgot-password-email-error-msg').css('background-color', ERROR_COLOR);
    }
    $(".forgot-password-email-error-msg").text(message);
    $('.forgot-password-email-error-msg-wrapper').css('display', 'block');
}

function forgetPasswordDialogCloseEvent() {
    $('.forgot-password-base').css('display', 'none');
    $('.disabled-background-html-base').css('display', 'none');
}