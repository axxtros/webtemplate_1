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

function initLoginPage() {
    $('.first-parallax').css({'background-position-y':0 + 'px'});    
    $('.second-parallax').css({'background-position-y':parallax_image_y_2 + 'px'});
}

/*
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
    if(browser !== 'firefox') {
        event.preventDefault();     //azért, mert FF alatt ez nincs inicializálva és kezelve
    }        
    //event.preventDefault();             //ne hívódjon meg az anchor default esemény, a lap tetejére ugrás (FF alatt nincs automatikusan felinicializálva az event!!!)
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