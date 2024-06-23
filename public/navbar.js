// top nav open menu when clicked on hamburger icon
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


async function updateNavbar() {
  const response = await fetch('/session-status');
  const status = await response.json();

  const navbar = document.querySelector('.navbar');
  if (status.isLoggedIn) {
      navbar.innerHTML = `
          <a href="index.html"><img src="images/Logo.png" id="logo" alt="Logo"></a>
          <a class="links" href="index.html">Home</a>
          <a class="links" href="openings.html">Job Openings</a>
          <a class="links" href="benefits.html">Vaccine Appointments</a>
          <a class="links" href="apply.html">Apply</a>
          <a class="links" href="dashboard.html">Account</a>
          <a class="links" id="Contactmargin" href="/logout">Log Out</a>
      `;
  } else {
      navbar.innerHTML = `
          <a href="index.html"><img src="images/Logo.png" id="logo" alt="Logo"></a>
          <a class="links" href="index.html">Home</a>
          <a class="links" href="openings.html">Job Openings</a>
          <a class="links" href="benefits.html">Vaccine Appointments</a>
          <a class="links" href="apply.html">Apply</a>
          <a class="links" href="login.html">Log In</a>
          <a class="links" id="Contactmargin" href="signup.html">Sign Up</a>
      `;
  }
}

// Call updateNavbar on page load
document.addEventListener('DOMContentLoaded', updateNavbar);
