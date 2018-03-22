window.addEventListener("DOMContentLoaded", init);

let container;
let images;
let imagesCount;
let position = 0;

function slide() {
  console.log(position, imagesCount);  
  if (position < imagesCount - 1) {
      
      let curPos = container.style.left;
      container.style.left = (parseInt(curPos) - 1) + "px"; 
    } else {
      let curPos = container.style.left;
      container.style.left = 0 + "px";
      position = -1;
    }
    position ++;
    setTimeout(slide, 1500);
}

function init() {
  container = document.getElementById("container");
  container.style.left = "0";

  images = document.getElementsByClassName("my-image");
  imagesCount = images.length;
  setTimeout(slide, 2000);
}