// <!-- Email JavaScript library -->
 
  
    // send email to user saying that account was succsesfully created
    function sendEmail() {
      // Use the Email object's send function (defined in SMTPJS library).
      // SecureToken is obtained from smtpjs.com website which allows one to
      // encrypt the credentials required to send email using a SMTP server. 
      // Here we are using smtp.elasticemail.com as our SMTP server (see elasticemail.com)
      Email.send({
        SecureToken: "13956b45-d222-49d9-bb43-e6bb24c735bc ",
        To: document.getElementById('signupEmail').value,
        From: 'futuramedicalinc@gmail.com',
        Subject: "Account successfully created ",
        Body: "Full Name: " + document.getElementById("fullName").value +
          "<br>Email: " + document.getElementById("signupEmail").value +
          "<br>Phone: " + document.getElementById("phoneNumber").value +
          "<br>Age: " + document.getElementById("age").value
      })


    }

    document.getElementById('signup-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const signupEmail = document.getElementById('signupEmail').value;
      const password = document.getElementById('password').value;
      const fullName = document.getElementById("fullName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const age = document.getElementById("age").value;

      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signupEmail, password, fullName, phoneNumber, age })
      });

      const message = await response.text();
      sendEmail();
      document.getElementById('message').innerText = message;
    });




