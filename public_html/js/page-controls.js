/* 
    Created on : Aug 28, 2017, 14:04:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

function toggleContentPanel(contentblock) {        
    if(contentblock !== null) {        
        $(contentblock).next().slideToggle( "fast", function() {
            var blockOpenCloseImage = $(contentblock).children().children();            
//            console.log($(blockOpenCloseImage).attr('class'));
            if ($(contentblock).next().is(':visible')) {
                $(blockOpenCloseImage).attr('src', 'img/block_toggle_icon_open.svg');
            } else {
                $(blockOpenCloseImage).attr('src', 'img/block_toggle_icon_close.svg');
            }            
        });
    }
}