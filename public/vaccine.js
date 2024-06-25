let selectedVaccine = ''; // These create empty variables that can be used later in the code
let ageLimit = 0;
let schedulingOption = '';
let bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || {}; // Allows JSON to parse through local storage which is storage that stays even after
//the website becomes reloaded or closed allowing for booked slots to be greyed out

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/session-status');
    const status = await response.json();

    if (status.isLoggedIn) {
        document.getElementById('loginFirst').style.display = 'none';
        document.getElementById('vaccineContainer').style.display = 'block';
        loadBookedSlots();
    }
    else {
        document.getElementById('loginFirst').style.display = 'block';
        document.getElementById('vaccineContainer').style.display = 'none';
    }
});


function loadBookedSlots() {
    updateTimePicker();
    updateDisabledDates();
}

function selectOption(option) {
    schedulingOption = option;
    document.querySelector('.option-buttons').classList.add('hidden');
    document.getElementById('vaccineSelection').classList.remove('hidden');
}

function handleVaccineSelection() {
    selectedVaccine = document.getElementById('vaccineType').value;

    switch (selectedVaccine) {
        case 'covid19':
        case 'flu':
            ageLimit = 0.5; // Age limit is 6 months (0.5 years)
            break;
        case 'tetanus':
            ageLimit = 7; // Age limit is 7 years
            break;
        case 'mumps':
        case 'measles':
            ageLimit = 1; // Age limit is 1 year
            break;
        default:
            ageLimit = 0;
            break;
    }
}

function proceedToNextStep() {
    if (!selectedVaccine) {
        alert('Please select a valid vaccine type.');
        return;
    }

    if (schedulingOption === 'individual') {
        document.getElementById('vaccineSelection').classList.add('hidden');

        if (selectedVaccine === 'covid19' || selectedVaccine === 'flu') {
            document.getElementById('ageQuestionCovidFlu').classList.remove('hidden');
        } else if (selectedVaccine === 'tetanus') {
            document.getElementById('ageQuestionTetanus').classList.remove('hidden');
        } else if (selectedVaccine === 'mumps' || selectedVaccine === 'measles') {
            document.getElementById('ageQuestionMumps').classList.remove('hidden');
        }
    } else if (schedulingOption === 'group') {
        document.getElementById('vaccineSelection').classList.add('hidden');
        document.getElementById('groupQuestion').classList.remove('hidden');
    }
}

function handleAgeConfirmationCovidFlu() {
    const underAgeInput = document.querySelector('input[name="underAgeCovidFlu"]:checked');

    if (!underAgeInput) {
        alert('Please select whether the vaccine recipient is under 6 months of age.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('The vaccine cannot be administered due to age restrictions.');
        return;
    }

    // Proceed with other logic if age condition is satisfied
    document.getElementById('ageQuestionCovidFlu').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
}

function handleAgeConfirmationTetanus() {
    const underAgeInput = document.querySelector('input[name="underAgeTetanus"]:checked');

    if (!underAgeInput) {
        alert('Please select whether the vaccine recipient is under 7 years of age.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }
    document.getElementById('ageQuestionTetanus').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
}

function handleAgeConfirmationMumps() {
    const underAgeInput = document.querySelector('input[name="underAgeMumps"]:checked');

    if (!underAgeInput) {
        alert('Please select whether the vaccine recipient is under 1 year of age.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('ageQuestionMumps').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
}

function handleAgeConfirmationMeasles() {
    const underAgeInput = document.querySelector('input[name="underAgeMeasles"]:checked');

    if (!underAgeInput) {
        alert('Please select whether the vaccine recipient is under 1 year of age.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('ageQuestionMeasles').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
}

function showGroupAgeQuestion() {
    const groupSize = document.getElementById('groupSizeInput').value;
    if (!groupSize || groupSize <= 1) {
        alert('Please enter a valid group size.');
        return;
    }
    else if (!groupSize || groupSize > 6) {
        alert('Please enter a valid group size. Group size is 2-6')
        return;
    }

    document.getElementById('groupQuestion').classList.add('hidden');

    if (selectedVaccine === 'covid19' || selectedVaccine === 'flu') {
        document.getElementById('groupAgeQuestionCovidFlu').classList.remove('hidden');
    } else if (selectedVaccine === 'tetanus') {
        document.getElementById('groupAgeQuestionTetanus').classList.remove('hidden');
    } else if (selectedVaccine === 'mumps' || selectedVaccine === 'measles') {
        document.getElementById('groupAgeQuestionMumps').classList.remove('hidden');
    }
}

function handleGroupAgeConfirmationCovidFlu() {
    const underAgeInput = document.querySelector('input[name="underAgeGroupCovidFlu"]:checked');

    if (!underAgeInput) {
        alert('Please select whether there are individuals under the specified age in your group.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('groupAgeQuestionCovidFlu').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('timeSelection').classList.remove('hidden'); // Show time selection after age confirmation
}

function handleGroupAgeConfirmationTetanus() {
    const underAgeInput = document.querySelector('input[name="underAgeGroupTetanus"]:checked');

    if (!underAgeInput) {
        alert('Please select whether there are individuals under the specified age in your group.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('groupAgeQuestionTetanus').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('timeSelection').classList.remove('hidden'); // Show time selection after age confirmation
}

function handleGroupAgeConfirmationMumps() {
    const underAgeInput = document.querySelector('input[name="underAgeGroupMumps"]:checked');

    if (!underAgeInput) {
        alert('Please select whether there are individuals under the specified age in your group.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('groupAgeQuestionMumps').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('timeSelection').classList.remove('hidden'); // Show time selection after age confirmation
}

function handleGroupAgeConfirmationMeasles() {
    const underAgeInput = document.querySelector('input[name="underAgeGroupMeasles"]:checked');

    if (!underAgeInput) {
        alert('Please select whether there are individuals under the specified age in your group.');
        return;
    }

    if (underAgeInput.value === 'yes') {
        alert('This vaccine cannot be administered due to age restrictions.');
        return;
    }

    document.getElementById('groupAgeQuestionMeasles').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
    document.getElementById('timeSelection').classList.remove('hidden'); // Show time selection after age confirmation
}

// Function to validate selected date
function validateDate() {
    const selectedDate = document.getElementById('datePicker').value;
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate);

    if (selectedDateTime < currentDate) {
        alert('Please select a future date.');
        document.getElementById('datePicker').value = '';
    } else {
        updateTimePicker();
    }
}

// Function to update time picker based on selected date
function updateTimePicker() {
    const selectedDate = document.getElementById('datePicker').value;
    const fullyBookedTimes = bookedSlots[selectedDate] || [];

    const timePicker = document.getElementById('timePicker');
    timePicker.innerHTML = ''; // Clear previous options

    const availableTimes = [
        '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '6:00 PM',
        '6:30 PM', '7:30 PM', '8:00 PM', '9:00 PM', '9:30 PM'
    ];

    availableTimes.forEach(time => {
        if (!fullyBookedTimes.includes(time)) {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timePicker.appendChild(option);
        }
    });

    // Show the time selection and next button
    document.getElementById('timeSelection').classList.remove('hidden');
    document.getElementById('calendarNextButton').classList.remove('hidden');
}

// Function to proceed to contact details after selecting date and time
function showContactDetails() {
    const selectedDate = document.getElementById('datePicker').value;
    const selectedTime = document.getElementById('timePicker').value;

    if (!selectedDate || !selectedTime) {
        alert('Please select both date and time.');
        return;
    }

    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('contactDetails').classList.remove('hidden');
}

async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch values from input fields
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const selectedVaccine = document.getElementById('vaccineType').value;
    const selectedDate = document.getElementById('datePicker').value;
    const selectedTime = document.getElementById('timePicker').value;
    const groupSize = document.getElementById('groupSizeInput').value;

    // Validate form fields
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
        alert('Please fill out all the fields.');
        return;
    }
    if (phone<10) {
        alert('Not a valid phone number');
        return;
    }

    // Prepare the email content
    const emailContent = `
 Dear ${name},<br><br>
 Thank you for registering for a vaccine with Futura!<br><br>
 You have successfully booked a vaccine appointment.<br>
 <strong>Details:</strong><br>
 - Vaccine: ${selectedVaccine}<br>
 - Contact Email: ${email}<br>
 - Contact Phone: ${phone}<br>
 - Date: ${selectedDate}<br>
 - Time: ${selectedTime}<br>
 - Groupsize: ${groupSize}<br>
 Please feel free to contact us if you have any further questions.<br><br>
 Best regards,<br>
 The Futura Team
 `;

    // Sending the email using SMTPJS and Elastic Email's SMTP server
    Email.send({
        SecureToken: "13956b45-d222-49d9-bb43-e6bb24c735bc",
        To: email,
        From: "futuramedicalinc@gmail.com",
        Subject: "Vaccine Scheduling Confirmation",
        Body: emailContent
    }).then(
        message => {
            if (message === "OK") {
                // Hide contact details and show thank you message on successful email send
                document.getElementById('contactDetails').classList.add('hidden');
                document.getElementById('thankYouMessage').classList.remove('hidden');
            } else {
                // Alert user if email sending fails
                alert("Failed to send the email: " + message);
            }
        }
    );

    //save the appointment
    const appointment = {
        name: name,
        email: email,
        phone: phone,
        selectedVaccine: selectedVaccine,
        selectedDate: selectedDate,
        selectedTime: selectedTime,

    }

    response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });
}