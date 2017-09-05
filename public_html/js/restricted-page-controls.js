/* 
    Created on : Aug 28, 2017, 14:04:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var SIDE_MENU_SUBMENU_ANIMATION_SPEED = 300;
var BLOCK_TOGGLE_ANIMATION_SPEED = 500;

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

function openCloseSideMenuSubMenu(parentmenuitem) {
    if(parentmenuitem !== null) {
        $(parentmenuitem).parent().next().slideToggle( SIDE_MENU_SUBMENU_ANIMATION_SPEED, function() {
            var blockOpenCloseImage = $(parentmenuitem).children().children();            
            if ($(parentmenuitem).parent().next().is(':visible')) {
                $(blockOpenCloseImage).attr('src', 'img/restricted-sidemenu-icons/sub-menu-icon-open.svg');            
            } else {
                $(blockOpenCloseImage).attr('src', 'img/restricted-sidemenu-icons/sub-menu-icon-close-fill.svg');
            }
            selectedSideMenuItemIconChange(parentmenuitem);
        });
    }
}

function toggleContentPanel(contentblock) {        
    if(contentblock !== null) {        
        $(contentblock).next().slideToggle( BLOCK_TOGGLE_ANIMATION_SPEED, function() {
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
            if(!srcname.includes("selected")) {
                $(imageitem).attr('src', srcname.substring(0, srcname.length - 4) + '-selected.svg');
            }            
        }
    }
}

function unSelectedSideMenuItemIconChange(menuitem) {
    if(menuitem !== null) {
        var imageitem = $(menuitem).children().children();
        if(imageitem !== null) {
            var srcname = $(imageitem).attr('src');
            if(srcname.includes("selected")) {
                $(imageitem).attr('src', srcname.substring(0, srcname.length - 13) + '.svg');   //13 = '-selected.svg'
            }            
        }
    }
}

