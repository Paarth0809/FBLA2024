// this is the function definition that when called will base64 encode the PDF file that
// is uploaded by the user
var reactToSubmitFormFunction = function (event) {

    event.preventDefault(); // Prevent the form from submitting normally

    // get the file that user wants to upload from the 'resume' input field 
    var file = document.getElementById('resume').files[0];
    if (!file) {
        alert('Please select a file!');
        return;
    }

    var reader = new FileReader();
    // define the function that will get called when the FileReader finishes loading/reading
    // the file - note that this function does not execute right away (it executes only 
    // after the loading/reading of the user's PDF resume)
    reader.onloadend = function () {
        // the result of loading/reading the user's PDF resume is base64 encoded string
        var base64data = reader.result;
        // use the file name and base64 data  to send email
        sendEmail(file.name, base64data);
    }

    // start loading/reading the user's PDF resume file - when this finishes then the above
    // defined reader.onloaded function gets called
    reader.readAsDataURL(file);
};

document.getElementById('job-application-form').addEventListener('submit', reactToSubmitFormFunction);

// send email with the user's details and PDF resume
// takes the file name and base64 encoded data as parameters
function sendEmail(fileName, base64data) {
    // Use the Email object's send function (defined in SMTPJS library).
    // SecureToken is obtained from smtpjs.com website which allows one to
    // encrypt the credentials required to send email using a SMTP server. 
    // Here we are using smtp.elasticemail.com as our SMTP server (see elasticemail.com)
    Email.send({
        SecureToken: "13956b45-d222-49d9-bb43-e6bb24c735bc ",
        To: 'futuramedicalinc@gmail.com',
        From: 'futuramedicalinc@gmail.com',
        Subject: "Job Application from " + document.getElementById("name").value,
        Body: "Name: " + document.getElementById("name").value +
            "<br>Email: " + document.getElementById("email").value +
            "<br>Phone: " + document.getElementById("phone").value +
            "<br>Signature: " + document.getElementById("signature").value +
            "<br>Date Of Birth: " + document.getElementById("DOB").value +
            "<br>Address: " + document.getElementById("address").value +
            "<br>City: " + document.getElementById("city").value +
            "<br>State: " + document.getElementById("state").value +
            "<br>Zip: " + document.getElementById("zip").value +
            "<br>Job Name: " + document.getElementById("jobs").value +
            "<br>Education Level: " + document.getElementById("edu-level").value +
            "<br>Job Start Date: " + document.getElementById("job-start-date").value +
            "<br>Reason to Work: " + document.getElementById("q1").value,
        Attachments: [
            {
                name: fileName,
                data: base64data
            }]

    });

    alert("Your job application was submitted successfully! We will get back with you shortly!");
}