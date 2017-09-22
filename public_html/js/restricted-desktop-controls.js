/* 
    Created on : Aug 28, 2017, 14:04:05 AM
    Author     : axtros
    Lapvezérlő függvények.
*/

var SIDE_MENU_SUBMENU_ANIMATION_SPEED = 300;
var BLOCK_TOGGLE_ANIMATION_SPEED = 500;

var MODAL_DRAGGABLE_DIALOG_DEFAULT_WIDTH = 600;   //px
var MODAL_DRAGGABLE_DIALOG_DEFAULT_HEIGHT = 200;   //px

function pageOnLoadEvent() {
    initClientMetadatas();
    setMessageNotificationDiv();
    initUIEffects();
}

/**
 * jQuery UI effects init. (http://jqueryui.com/)
 * @returns {undefined}
 */
function initUIEffects() {
    $( function() {
        $('.dialog-modal-draggable').draggable();
    });
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
                selectedSideMenuItemIconChange(parentmenuitem);
            } else {
                $(blockOpenCloseImage).attr('src', 'img/restricted-sidemenu-icons/sub-menu-icon-close-fill.svg');
                unSelectedSideMenuItemIconChange(parentmenuitem);
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

function openCloseContentPanelBlock(contentblock) {        
    if(contentblock !== null) {        
        $(contentblock).next().slideToggle( BLOCK_TOGGLE_ANIMATION_SPEED, function() {
            var blockOpenCloseImage = $(contentblock).children().children();            
//            console.log($(blockOpenCloseImage).attr('class'));
            if ($(contentblock).next().is(':visible')) {
                $(blockOpenCloseImage).attr('src', 'img/restricted-content-block-icons/block_toggle_icon_open.svg');
            } else {
                $(blockOpenCloseImage).attr('src', 'img/restricted-content-block-icons/block_toggle_icon_fill_close.svg');
            }            
        });
    }
}

/**
 * Megnyit egy modális dialógus ablakot.
 * @param {type} type Típus: info, warn, err, succ
 * @param {type} title Az ablak címe
 * @param {type} message Az ablaklban feladott üzenet
 * @returns {undefined}
 */
function openModalDialog(type, title, message) {
    if(browserName !== BROWSER_FIREFOX_NAME) {
        event.preventDefault();
    }
    
    switch(type) {
        case 'INFO' : $('.dialog-modal-draggable-header-wrapper').css('background-color', '#4a8bf5'); break;
        case 'WARN' : $('.dialog-modal-draggable-header-wrapper').css('background-color', '#fd7037'); break;
        case 'ERR'  : $('.dialog-modal-draggable-header-wrapper').css('background-color', '#d04f3a'); break;
        case 'SUCC' : $('.dialog-modal-draggable-header-wrapper').css('background-color', '#45bf7b'); break; 
        default     : $('.dialog-modal-draggable-header-wrapper').css('background-color', '#4a8bf5'); break;
    }
    
    $('.dialog-modal-draggable-header-wrapper label').text(title);
    $('.dialog-modal-draggable-content-wrapper').text(message);
    
    var bodyWidth = $(document.body).width();
    var bodyOffset = $(document.body).offset().left;
    var leftPos = bodyOffset + ((bodyWidth / 2) - (MODAL_DRAGGABLE_DIALOG_DEFAULT_WIDTH / 2));
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var topPos = ((viewportHeight / 2) - (MODAL_DRAGGABLE_DIALOG_DEFAULT_HEIGHT / 2));
    
    $('.dialog-modal-draggable').css('top', topPos + 'px');
    $('.dialog-modal-draggable').css('left', leftPos + 'px');
    $('.dialog-modal-draggable').css('width', MODAL_DRAGGABLE_DIALOG_DEFAULT_WIDTH);    
    //$('.dialog-modal-draggable').css('height', MODAL_DRAGGABLE_DIALOG_DEFAULT_HEIGHT);    
        
    $('.disabled-background-html-base').css('display', 'block');
    $('.dialog-modal-draggable').css('display', 'block');    
}

function closeModalDialog() {
    $('.dialog-modal-draggable').css('display', 'none');
    $('.disabled-background-html-base').css('display', 'none');    
}