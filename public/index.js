// fade in 1 by 1
console.log('starting...');
var elements = document.querySelectorAll('.fade-elements');
console.log(elements);

var delay = 0;

elements.forEach(function (element) {
  setTimeout(function () {
    console.log(element.outerHTML);
    element.classList.add('fadeIn');
  }, delay);

  delay += 500; // Increase delay for next element
});

// Statistcs js animation
// Create a new Intersection Observer instance
let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.9 }); // Adjust the threshold value according to your needs

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';
  observer.observe(counter);
});

function updateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const increment = target / 200;

  const intervalId = setInterval(() => {
    const currentValue = +counter.innerText.replace(/,/g, '');
    if (currentValue < target) {
      const newValue = Math.ceil(currentValue + increment);
      counter.innerText = newValue.toLocaleString(); // Format with commas
    } else {
      counter.innerText = target.toLocaleString(); // Ensure the final value is formatted
      clearInterval(intervalId);
    }
  }, 1);
}


document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider-wrapper img');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const dots = document.querySelectorAll('.dot');

  const showSlides = (n) => {
    if (n >= slides.length) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex = n;
    }
    const slideWidth = slides[0].clientWidth;
    sliderWrapper.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
    dots.forEach((dot, index) => {
      dot.className = (index === slideIndex) ? 'dot active' : 'dot';
    });
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide(index);
    });
  });

  showSlides(slideIndex);
});
