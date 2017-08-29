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

function selectedSideMenuItemIconChange(menuitem) {
    if(menuitem !== null) {
        var imageitem = $(menuitem).children().children();
        if(imageitem !== null) {
            var srcname = $(imageitem).attr('src');
            $(imageitem).attr('src', srcname.substring(0, srcname.length - 4) + '-selected.svg');
        }
    }
}

function unSelectedSideMenuItemIconChange(menuitem) {
    if(menuitem !== null) {
        var imageitem = $(menuitem).children().children();
        if(imageitem !== null) {
            var srcname = $(imageitem).attr('src');
            $(imageitem).attr('src', srcname.substring(0, srcname.length - 13) + '.svg');   //13 = '-selected.svg'
        }
    }
}

