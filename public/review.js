document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, rating, review })
    });

    document.getElementById('name').value = null;
    document.getElementById('review').value = null;
    document.getElementById('rating').value = null;
    
    if (response.ok) {
        const newReview = await response.json();
        addReviewToPage(newReview);
    } else {
        console.error('Error with request:', response.statusText);
    }
});

function addReviewToPage(review) {
    const reviewsDiv = document.getElementById('reviews');
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    const name = document.createElement('h3');
    name.textContent = review.name;
    reviewDiv.appendChild(name);

    const date = document.createElement('h5');
    date.textContent = review.date;
    reviewDiv.appendChild(date);

    const rating = document.createElement('p');
    rating.textContent = 'Rating: ' + review.rating;
    reviewDiv.appendChild(rating);

    const reviewText = document.createElement('p');
    reviewText.textContent = review.review;
    reviewDiv.appendChild(reviewText);

    reviewsDiv.appendChild(reviewDiv);
}



// Fetch existing reviews on page load
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/reviews');
    if (response.ok) {
        const reviews = await response.json();
        reviews.forEach(review => addReviewToPage(review));
    } else {
        console.error('Error fetching reviews:', response.statusText);
    }
});
