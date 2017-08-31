/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

/*
 * Háttérkép parallax animációja, ha kell akkor itt programozd le.
 * @returns {undefined}
 */
//(function(){    
//    window.onscroll = function(){
//        var scrolled = $(window).scrollTop();
//        //$('.parallax').css('background-position-y', -(scrolled * 0.2) + 'px');
//    };
//})();

/*
 * A parallax weboldalon az adott tartalomrészhez scrollozik animáltan.
 */
function scrollToContent(anchorTag) {
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top - 60}, 500);    //a 60 a felső fix menüsor height miatt kell bele, a body top padding-ja (--header-width-g)!
}