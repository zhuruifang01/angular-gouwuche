$(function(){
   $(".look-category").on("click",function(){
       $(".mask").fadeIn();
   });
    $(".close").on("click",function(){
        $(".mask").fadeOut();
    })

    var mySwiper1 = new Swiper('#nav',{
        freeMode : true,
        slidesPerView : 'auto'
    });
});