function addAnimation(id, effect) {
    $('#'+id).removeClass().addClass(effect + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
};

function toClipboard(id){
    var element = document.getElementById(id);
    var textArea = document.createElement("textarea");
    textArea.value = element.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
};


$(document).ready(function(){

    // activate tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $('#toTop').click(function(e){
        $.scrollTo(0, 800); 
    });

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
        /* Check the location of each desired element */
        $('.scroll-fade-in').each( function(i){

            /*if (bottom_of_window > bottom_of_object){*/
            if ( $(window).scrollTop() > $(this).position().top - $(window).height()/3 ){

              $(this).animate({
                opacity: "1"
              }, {
                duration: 1000,
                specialEasing: {
                },
                complete: function() {
                  $( this ).removeClass( "scroll-fade-in" );
                }
              });

            }      
        });
 
    });

});
