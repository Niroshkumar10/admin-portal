const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Register Route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    "INSERT INTO students (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Email already registered." });
      }
      res.json({ message: "Registration successful." });
    }
  );
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM students WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
      res.json({ message: "Login success." });
    }
  );
});

// Get All Students
app.get('/students', (req, res) => {
  db.query("SELECT name, email FROM students", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching students" });
    }
    res.json(results);
  });
});


const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
