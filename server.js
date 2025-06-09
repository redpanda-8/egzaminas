const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./backend/models/db'); // <-- IMPORTANT: this connects to MySQL

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./backend/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Routes 
app.get('/', (req, res) => {
  res.send(' API is working!');
});
// <-- IMPORTANT: after the middleware and before listen
const salesRoutes = require('./backend/routes/authRoutes');
app.use('/api/sales', salesRoutes); 

const orderRoutes = require('./backend/routes/authRoutes');
app.use('/api/user', orderRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`MySQL connected!`);
  console.log(`Server running on http://localhost:${PORT}`);
});