$(document).ready(()=>{
    $("#scrollButton").on('click', function() {
        $('html, body').animate({
            scrollTop: $("#blog").offset().top
        }, 2000);
    });
});