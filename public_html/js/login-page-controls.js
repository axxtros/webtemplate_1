/* 
    Created on : Aug 29, 2017, 10:38:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var scrolled;
var parallax_image_y_1 = 0;         //az első parallax kép mindig 0
var parallax_image_y_2 = 300;       //ezek viszonyszámok, fontos, hogy mekkora tartalom van felettük, és ha változik az oldal nagysága, akkor ezeket a számokat utánuk kell állítani,
                                    //annak érdekében, hogy a görgetett parallax képek 'nagyjából' középen legyenek a görgetési tartalom fókuszában (képernyő közepében)

function initLoginPage() {
    $('.first-parallax').css({'background-position-y':0+'px'});    
    $('.second-parallax').css({'background-position-y':parallax_image_y_2+'px'});
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

        var parallax_image_scroll_y_1 = parallax_image_y_1 - (scrolled * 0.2);
        $('.first-parallax').css('background-position-y', parallax_image_scroll_y_1 + 'px');
        
        var parallax_image_scroll_y_2 = parallax_image_y_2 - (scrolled * 0.2);
        $('.second-parallax').css('background-position-y', parallax_image_scroll_y_2 + 'px');        
    };
})();

/*
 * A parallax weboldalon a menüpont választás után az adott tartalomrészhez scrollozik animáltan.
 */
function scrollToContent(anchorTag) {    
    //ezt majd kezeld, mert le FF alatt nem jó
    //event.preventDefault();             //ne hívódjon meg az anchor default esemény, a lap tetejére ugrás (FF alatt nincs automatikusan felinicializálva az event!!!)
    
    $('html, body').animate({scrollTop: $( $.attr(anchorTag, 'href') ).offset().top - 60}, 500);    //a 60 a felső fix menüsor height miatt kell bele, a body top padding-ja (css: --header-width-g)!        
    return false;
}