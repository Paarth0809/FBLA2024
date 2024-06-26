

function addAppointmentsToPage(appointment) {
    console.log("Appointment: ", appointment)
    const appointmentsDiv = document.getElementById('appointments');
    const appointmentDiv = document.createElement('div');
    appointmentDiv.classList.add('a');

    const name = document.createElement('h3');
    name.textContent = appointment.name;
    appointmentDiv.appendChild(name);

    const selectedDate = document.createElement('h4');
    selectedDate.textContent = appointment.selectedDate;
    appointmentDiv.appendChild(selectedDate);
    console.log("selectedDate: ", selectedDate);

    const selectedTime = document.createElement('h4');
    selectedTime.textContent = appointment.selectedTime;
    appointmentDiv.appendChild(selectedTime);

    const email = document.createElement('p');
    email.textContent = appointment.email;
    appointmentDiv.appendChild(email);

    const phone = document.createElement('p');
    phone.textContent = 'Phone Number: ' + appointment.phone;
    appointmentDiv.appendChild(phone);

    const appointmentText = document.createElement('p');
    appointmentText.textContent = 'Vaccine: ' + appointment.selectedVaccine;
    appointmentDiv.appendChild(appointmentText);

    appointmentsDiv.appendChild(appointmentDiv);
}



// Fetch existing reviews on page load
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('api/appointments');
    if (response.ok) {
        const appointments = await response.json();
        console.log("Appointments: ", appointments);
        appointments.forEach(appointment => addAppointmentsToPage(appointment));
    } else {
        console.error('Error fetching appointments:', response.statusText);
    }
});
