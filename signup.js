const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

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
  const { username, password } = req.body;
  const users = getUsers();
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  res.status(201).send('User created');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid username or password');
  }

  res.status(200).send('Login successful');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
