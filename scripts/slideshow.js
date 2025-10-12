let slideIndex = 0;
const slides = document.querySelectorAll('.mySlides');
const inner = document.querySelector('.slideshow-inner');
const lines = document.querySelectorAll('.line');
const slideWidth = slides[0].clientWidth;

function showSlides(n) {
  slideIndex = n;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  
  inner.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
  updateLines();
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function updateLines(){
    lines.forEach((line, index) => {
        if(index === slideIndex % lines.length){
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

// Add click event listeners to lines
lines.forEach((line, index) => {
    line.addEventListener('click', () => {
        currentSlide(index);
    });
});

// Initial setup
showSlides(slideIndex);

