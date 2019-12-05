require('../css/kinderkoor.scss');

require('bootstrap');
require('jquery.scrollTo');

var $ = require('jquery');
window.$ = $;
window.jQuery = $;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$(document).ready(function(){

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })

    $(function() {
       $('[data-toggle="popover"]').popover();
    })

    $('#toTop').click(function(e){
        $.scrollTo(0, 700); 
    })

    /*  init back to top icon */
    var scrollPos; 
    var toTopVisible=false;
    var toTop = document.getElementById('toTop');
 
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
        // get scroll position
        scrollPos = $(window).scrollTop();
        // show back to top
        if ( scrollPos >= 400 && !toTopVisible ){
            toTopVisible=true;
            toTop.style.visibility="visible";
            toTop.style.opacity="0";
            $('#toTop').animate({'opacity':'1'},750);
        } 
        if ( scrollPos < 400 && toTopVisible ){
            toTopVisible=false;
            $('#toTop').animate({'opacity':'0'},750,function(){ 
                toTop.style.visibility="hidden";
            });
        }

    });

});
