const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Register Route
// Update register route to include student_id
app.post('/register', (req, res) => {
  const { student_id, name, email, password } = req.body;
  db.query(
    "INSERT INTO students (student_id, name, email, password) VALUES (?, ?, ?, ?)",
    [student_id, name, email, password],
    (err) => {
      if (err) {
        return res.status(500).json({ message: err.message.includes('Duplicate') ? "Email or Student ID already registered." : "Registration failed." });
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
      res.json({ message: "Login successful." });
    }
  );
});

// Get All Students
app.get('/students', (req, res) => {
  db.query("SELECT id, student_id, name, email FROM students", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching students" });
    }
    res.json(results);
  });
});

// Get Single Student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { student_id, name, email } = req.body;
  
  db.query(
    "UPDATE students SET student_id = ?, name = ?, email = ? WHERE id = ?",
    [student_id, name, email, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message.includes('Duplicate') ? "Email or Student ID already exists" : "Error updating student" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student updated successfully" });
    }
  );
});

// Update Student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  db.query(
    "UPDATE students SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error updating student" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student updated successfully" });
    }
  );
});

// Delete Student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  
  db.query(
    "DELETE FROM students WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting student" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    }
  );
});

const PORT = 3009;
const server=app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports= {app,server} // Export the app for testing purposes