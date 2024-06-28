// Job search and filters

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const locationSelect = document.getElementById('location');
  const teamSelect = document.getElementById('team');
  const jobCards = document.querySelectorAll('.job-card');
  const noResults = document.getElementById('no-results');

  function filterJobs() {
    const searchValue = searchInput.value.toLowerCase();
    const locationValue = locationSelect.value.toLowerCase();
    const teamValue = teamSelect.value.toLowerCase();

    let matchesFound = false;

    jobCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const location = card.querySelector('.cardItem:nth-child(2)').textContent.toLowerCase();
      const team = card.querySelector('.cardItem:nth-child(3)').textContent.toLowerCase();

      const matchesSearch = title.includes(searchValue);
      const matchesLocation = locationValue === 'all' || location.includes(locationValue);
      const matchesTeam = teamValue === 'all' || team.includes(teamValue);

      if (matchesSearch && matchesLocation && matchesTeam) {
        card.style.display = '';
        matchesFound = true;
      } else {
        card.style.display = 'none';
      }
    });

    noResults.style.display = matchesFound ? 'none' : 'block';
  }

  searchInput.addEventListener('input', filterJobs);
  locationSelect.addEventListener('change', filterJobs);
  teamSelect.addEventListener('change', filterJobs);
});




document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const locationSelect = document.getElementById('location');
  const teamSelect = document.getElementById('team');
  const jobCards = document.querySelectorAll('.job-card');
  const noResults = document.getElementById('no-results');
  const jobListings = document.querySelector('.job-listings');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  function filterJobs() {
    const searchValue = searchInput.value.toLowerCase();
    const locationValue = locationSelect.value.toLowerCase();
    const teamValue = teamSelect.value.toLowerCase();

    let matchesFound = false;

    jobCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const location = card.querySelector('.cardItem:nth-child(2)').textContent.toLowerCase();
      const team = card.querySelector('.cardItem:nth-child(3)').textContent.toLowerCase();

      const matchesSearch = title.includes(searchValue);
      const matchesLocation = locationValue === 'all' || location.includes(locationValue);
      const matchesTeam = teamValue === 'all' || team.includes(teamValue);

      if (matchesSearch && matchesLocation && matchesTeam) {
        card.style.display = '';
        matchesFound = true;
      } else {
        card.style.display = 'none';
      }
    });

    noResults.style.display = matchesFound ? 'none' : 'block';
  }

  searchInput.addEventListener('input', filterJobs);
  locationSelect.addEventListener('change', filterJobs);
  teamSelect.addEventListener('change', filterJobs);

  leftArrow.addEventListener('click', function () {
    jobListings.scrollBy({
      left: -400,
      behavior: 'smooth'
    });
  });

  rightArrow.addEventListener('click', function () {
    jobListings.scrollBy({
      left: 400,
      behavior: 'smooth'
    });
  });
});



