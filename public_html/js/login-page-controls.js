/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

(function(){    
    window.onscroll = function(){
        var scrolled = $(window).scrollTop();
        //$('.parallax').css('background-position-y', -(scrolled * 0.2) + 'px');
    };
})();

function scrollToContent(anchorTag) {
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top}, 500);
}