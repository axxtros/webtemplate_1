/* 
    Created on : Aug 28, 2017, 14:04:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

function pageOnLoadEvent() {
    setMessageNotificationDiv();
}

function setMessageNotificationDiv() {
    var messageIcon = document.getElementById("header-user-message-div");
    var notificationNumberDiv = document.getElementById("header-message-number-notification-div");
    var notificationLeft = messageIcon.offsetLeft + 15;
    notificationNumberDiv.style.left = notificationLeft+'px';
    var notificationTop = messageIcon.offsetTop - 5;    
    var calcCoord = 0;
    var windowOffset = $(window).scrollTop();
    if(windowOffset === 0) {
        calcCoord = notificationTop;        
    } else {        
        calcCoord = windowOffset - notificationTop+'px';
    }   
    notificationNumberDiv.style.top = calcCoord + 'px';
}

function toggleContentPanel(contentblock) {        
    if(contentblock !== null) {        
        $(contentblock).next().slideToggle( "fast", function() {
            var blockOpenCloseImage = $(contentblock).children().children();            
//            console.log($(blockOpenCloseImage).attr('class'));
            if ($(contentblock).next().is(':visible')) {
                $(blockOpenCloseImage).attr('src', 'img/restricted-content-block-icons/block_toggle_icon_open.svg');
            } else {
                $(blockOpenCloseImage).attr('src', 'img/restricted-content-block-icons/block_toggle_icon_close.svg');
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

