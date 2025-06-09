const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models/db'); // <-- IMPORTANT: this connects to MySQL

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.get('/', (req, res) => {
  res.send('Egzamino app API is working');
});

// Start server
app.listen(PORT, () => {
  console.log(`MySQL connected`);
  console.log(`Server running on http://localhost:${PORT}`);
});