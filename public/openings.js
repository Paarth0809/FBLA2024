// scrolling smoothly

document.getElementById('scroll-left').addEventListener('click', function() {
    document.querySelector('.scroll-container').scrollBy({
        top: 0,
        left: -480,
        behavior: 'smooth' //  smooth scrolling behavior
    });
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.querySelector('.scroll-container').scrollBy({
        top: 0,
        left: 480,
        behavior: 'smooth' //smooth scrolling behavior
    });
});



// Job search and filters



  
  