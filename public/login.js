document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginEmail').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const messageDiv = document.getElementById('message');

    if (response.ok) {
        const message = await response.text();
        if (message === "Login successful") {
            window.location.href = 'dashboard.html';
        } else {
            messageDiv.innerText = message;
        }
    } else {
        const errorMessage = await response.text();
        messageDiv.innerText = errorMessage;
    }
});
