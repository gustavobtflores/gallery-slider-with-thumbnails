var featuredSlider = document.querySelector('#featured-slider');
var slides = featuredSlider.querySelectorAll('.slider-current .slide');
var activeSlide = 0;
var prevSlideBtn = featuredSlider.querySelector('#prev-slide');
var nextSlideBtn = featuredSlider.querySelector('#next-slide');
var transitionType = featuredSlider.dataset.transitionType;
var transitionSpeed = featuredSlider.dataset.transitionSpeed;
var autoplayInterval = featuredSlider.dataset.delay;

var autoplay = setInterval(nextSlide, autoplayInterval);

function resetInterval() {
  clearInterval(autoplay);
  autoplay = setInterval(nextSlide, autoplayInterval);
}

function fadeTransition(transitionSpeed) {
  slides.forEach((slide) => {
    slide.style.transitionDuration = `${transitionSpeed}ms`;
  });
}

function moveTransition(transitionSpeed) {
  slides.forEach((el) => {
    el.style.transform = `translateX(${activeSlide * -100}%)`;
    el.style.transitionDuration = `${transitionSpeed}ms`;
  });
}

function setActiveSlide(index) {
  slides[activeSlide].classList.remove('active');
  activeSlide = index;
  slides[activeSlide].classList.add('active');

  console.log(activeSlide);

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.style.transform = `translateX(calc(${activeSlide * -100}% - ${
      activeSlide * 12
    }px))`;
  });

  if (transitionType === 'fade') {
    fadeTransition(transitionSpeed);
    return;
  }

  if (transitionType === 'move') {
    moveTransition(transitionSpeed);
    return;
  }
}

function nextSlide() {
  resetInterval();

  if (activeSlide === slides.length - 1) {
    setActiveSlide(0);
    return;
  }

  setActiveSlide(activeSlide + 1);
}

function prevSlide() {
  resetInterval();

  if (activeSlide === 0) {
    setActiveSlide(slides.length - 1);
    return;
  }

  setActiveSlide(activeSlide - 1);
}

prevSlideBtn.addEventListener('click', prevSlide);
nextSlideBtn.addEventListener('click', nextSlide);

var thumbnails = featuredSlider.querySelectorAll(
  '.slider-thumbnails .thumbnail'
);

console.log(thumbnails);

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    setActiveSlide(index);
  });
});
