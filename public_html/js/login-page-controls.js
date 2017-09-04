/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var scrolled;
var parallax_image_y_1 = 0;         //az első parallax kép mindig 0
var parallax_image_y_2 = 300;       //ezek viszonyszámok, fontos, hogy mekkora tartalom van felettük, és ha változik az oldal nagysága, akkor ezeket a számokat utánuk kell állítani,
                                    //annak érdekében, hogy a görgetett parallax képek 'nagyjából' középen legyenek a görgetési tartalom fókuszában (képernyő közepében)
var parallax_bg_speed = 0.2;
var page_header_height = 60;

var cookie_expires_days = 365;
var lynxstudio_username_cookie_name =  'LYNXSTUDIO_USERNAME';
var lynxstudio_password_cookie_name =  'LYNXSTUDIO_PASSWORD';
var lynxstudio_remcheckbox_cookie_name =  'LYNXSTUDIO_REMEMBER_CHCKBOX';

function initLoginPage() {
    initParallaxBgImages();
    initLoginForm();    
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
    
    var browser = browserDetect();
    if(browser !== 'firefox') {             //azért, mert FF alatt az event nincs felinicializálva és kezelve, de ott nincs rá szükség
        event.preventDefault();             //ne hívódjon meg az anchor default esemény, a lap tetejére ugrás (FF alatt nincs automatikusan felinicializálva az event!!!)
    }            
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top - page_header_height}, 500);    //a 60 a felső fix menüsor height miatt kell bele, a body top padding-ja (css: --header-width-g)!
    return false;
}

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

function loginTrigger() {
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