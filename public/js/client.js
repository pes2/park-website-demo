console.log("client side server is running...");

//
// Images slideshow
//

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


function validateForm() {
  let comment = document.forms["commentForm"]["comment"].value;

  if (comment === "") {
    alert("Enter a valid comment");
    return false;
  };
}

function validate() {
  let title = document.forms["composeForm"]["blogTitle"].value;
  let post = document.forms["composeForm"]["blogBody"].value;

  if (title === "" || post === "") {
    alert("Enter a valid title and blog post");
    return false;
  };
}
