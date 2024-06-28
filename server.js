const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
// import OpenAI from 'openai';
// import { config } from 'dotenv';
const OpenAI = require('openai')
const { config } = require('dotenv')
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// read the Open AI key from the .env file 
config();

// create openai client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session management
app.use(session({
  secret: 'ILoveFBLAAndCoding2024',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true in production
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const usersFile = 'users.json';

const getUsers = () => {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users));
};
// sign up endpoint
app.post('/signup', async (req, res) => {
  const { signupEmail, password, fullName, age, phoneNumber } = req.body;
  const users = getUsers();
  const userExists = users.find(user => user.signupEmail === signupEmail);

  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ signupEmail, password: hashedPassword, fullName, age, phoneNumber });
  saveUsers(users);

  res.status(201).send('User created');
});

app.post('/login', async function (req, res) {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find(user => user.signupEmail.toLowerCase() === username.toLowerCase());

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid email or password');
  }

  // Save user in the Session
  req.session.user = { username: user.signupEmail };
  res.status(200).send('Login successful');
});

// Route to check session status
app.get('/session-status', (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.redirect('/');
  });
});

// Add review functionality
const reviewsFile = 'reviews.json';

function getReviews() {
  if (!fs.existsSync(reviewsFile)) {
    fs.writeFileSync(reviewsFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(reviewsFile);
  return JSON.parse(data);
};

function saveReviews(reviews) {
  fs.writeFileSync(reviewsFile, JSON.stringify(reviews));
};

app.post('/api/reviews', (req, res) => {
  const { name, rating, review } = req.body;
  const reviews = getReviews();
  const newReview = { name, rating, review, date: new Date().toISOString().split('T')[0] };
  reviews.push(newReview);
  saveReviews(reviews);
  res.status(201).json(newReview);
});

app.get('/api/reviews', (req, res) => {
  const reviews = getReviews();
  res.json(reviews);
});

// save info of appointments to the json file
const appointmentsFile = 'appointments.json';

function getAppointments() {
  if (!fs.existsSync(appointmentsFile)) {
    fs.writeFileSync(appointmentsFile, JSON.stringify({}));
  }
  const data = fs.readFileSync(appointmentsFile);
  return JSON.parse(data);
};

function saveAppointments(appointments) {
  console.log("appointments: ", appointments);
  try {
    const appointmentsJSON = JSON.stringify(appointments);
    console.log("appointments json: ", appointmentsJSON);
    fs.writeFileSync(appointmentsFile, appointmentsJSON);
  } catch (err) {
    console.error('Failed to save appointments:', err);
  }
};

// Endpoint to save booked appointments
app.post('/api/book-appointment', function (req, res) {
  const appointment = req.body;
  console.log("req.body: ", req.body);
  const signupEmail = req.session.user.username;
  console.log("signupEmail: ", signupEmail);

  const bookedAppointments = getAppointments();
  if (!bookedAppointments[signupEmail]) {
    bookedAppointments[signupEmail] = [];
  }
  //appointment.id = uuidv4(); // Assign a unique ID to the appointment
  bookedAppointments[signupEmail].push(appointment);
  console.log("booked appointments: ", bookedAppointments);
  saveAppointments(bookedAppointments);
  res.status(201).json(appointment);
});

// Endpoint to retrieve booked appointments for a user
app.get('/api/appointments', (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const bookedAppointments = getAppointments();
  console.log("Appointments: ", bookedAppointments[user.username]);
  res.status(200).send(bookedAppointments[user.username] || []);

});

// Serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// open ai api endpoint

const filePath = 'my_data.txt';

const fileContent = fs.readFileSync(filePath, 'utf8');

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  console.log("asked question:", question);


  try {
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: fileContent },
        { role: 'user', content: question },
      ],
      max_tokens: 1000,
      temperature: 0.8
    });

    res.json(gptResponse);
  } catch (error) {
    console.error('Error with OpenAI API request:', error);
    res.status(500).json({ error: 'Error with OpenAI API request' });
  }
});