const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Endpoint to get all users
app.get('/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Endpoint to get a user by ID
app.get('/users/:id', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.id === parseInt(req.params.id));
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

// Endpoint to get users by profession
app.get('/users/profession/:profession', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);
      const filteredUsers = Object.values(users).filter(user => user.profession.toLowerCase() === req.params.profession.toLowerCase());
      if (filteredUsers.length > 0) {
        res.send(filteredUsers);
      } else {
        res.status(404).send('No users found with that profession');
      }
    }
  });
});

// Endpoint to get a user by name
app.get('/users/name/:name', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to read data from file');
    } else {
      const users = JSON.parse(data);
      const user = Object.values(users).find(user => user.name.toLowerCase() === req.params.name.toLowerCase());
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});