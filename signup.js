const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session management
app.use(session({
  secret: 'yourSecretKey',
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find(user => user.signupEmail.toLowerCase() === username.toLowerCase());

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid email or password');
  }

  // Save user session
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

// Serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
