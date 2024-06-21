// Create a new Intersection Observer instance
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Adjust the threshold value according to your needs

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
