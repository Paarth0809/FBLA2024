document.getElementById('scroll-left').addEventListener('click', function() {
    document.querySelector('.scroll-container').scrollBy(-100, 0);
});

document.getElementById('scroll-right').addEventListener('click', function() {
    document.querySelector('.scroll-container').scrollBy(100, 0);
});
