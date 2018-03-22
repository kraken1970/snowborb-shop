$(document).ready(function(){
  $(".slider1.owl-carousel").owlCarousel({
    items: 1,
    autoplay:true,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    loop:true,
    dots: false
  });

  $(".slider-snowboards").owlCarousel({
    items: 5,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    loop: true,
    nav: true,
    navText: [ '', '' ],
    center: true,
  });
});
