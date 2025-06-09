const bcrypt = require('bcrypt');               // Used to hash passwords securely
const jwt = require('jsonwebtoken');           // Used to create authentication tokens
const db = require('../models/db');            // Our connection to MySQL database

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check for required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Hash the password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Prepare SQL query to insert user into database
  const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

  // Run SQL query
  db.query(sql, [name, email, hashedPassword, role || 'user'], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'User already exists or database error.' });
    }
    res.status(201).json({ message: 'User registered successfully!' });
  });
};

// Login existing user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const user = results[0];
    // Compare hashed password
    const match = await bcrypt.compare(password, user.password); 
    

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create JWT token with user ID and role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful!', token });
  });
};

module.exports = { registerUser, loginUser };