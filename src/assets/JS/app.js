$(document).ready(function(){
  
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

/* первый слайдер */ 
window.addEventListener("DOMContentLoaded", init);

let imagesCount;
let position = 0;
let container;
let images;
    
function slide() {
  
  if (position < imagesCount - 1) {
      
      let curPos = container.style.left;
      container.style.left = "-" + images[0].clientWidth + "px";
    } else {
      let curPos = container.style.left;
      container.style.left = 0 + "px";
      position = -1;
    }
    position ++;
    setTimeout(slide, 5000);
}

function init() {
  container = document.querySelector(".slide-container");
  container.style.left = "0";
  images = document.querySelectorAll(".slider__item");
  imagesCount = images.length;
  
  setTimeout(slide, 5000);
}

// обработка select:
function changeImage(form) {
  form.pic.src = form.imagename.value;
}

  