
const db = require('../models/db'); // Import database connection

// POST: Place an order
// This route allows a logged-in user to place an order for a specific sales
const placeOrder = (req, res) => {
  const userId = req.user.id;       // Extract user ID from the decoded JWT token (middleware)
  const { sale_id } = req.body;     // Get the selected sales ID from the client

  console.log('Placing order with:', { userId, sale_id }); // DEBUG log

  const sql = 'INSERT INTO orders (user_id, sale_id) VALUES (?, ?)';
  db.query(sql, [userId, sale_id], (err) => {
    if (err) {
      console.error('SQL Error:', err); // Log DB error
      return res.status(500).json({ message: 'Order failed' });
    }
    res.status(201).json({ message: 'Order placed successfully!' });
  });
};

// POST: Submit a rating for a sales
// This lets users give a rating (1-5 stars) to a specific sales
const addRating = (req, res) => {
  const userId = req.user.id;               // Logged-in user ID from token
  const { sale_id, stars } = req.body;      // Rating data from frontend

  // Validate star range
  if (stars < 1 || stars > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Insert the rating into database
  const sql = 'INSERT INTO ratings (user_id, sale_id, stars) VALUES (?, ?, ?)';
  db.query(sql, [userId, sale_id, stars], (err) => {
    if (err) return res.status(500).json({ message: 'Rating failed' });
    res.status(201).json({ message: 'Rating submitted!' });
  });
};

// GET: Search sales by name or category
// Public route that filters sales based on query string and calculates total rating
const searchSales = (req, res) => {
  const { name, category } = req.query; // Optional query params from frontend

  let sql = `
    SELECT d.*, COALESCE(SUM(r.stars), 0) AS total_rating
    FROM sales d
    LEFT JOIN ratings r ON d.id = r.sale_id
  `;

  const filters = [];   // Store SQL WHERE conditions
  const values = [];    // Store values for placeholders

  // Optional name filter
  if (name) {
    filters.push('d.name LIKE ?');         // Add LIKE condition
    values.push(`%${name}%`);              // Add value with wildcard search
  }

  // Optional category filter
  if (category) {
    filters.push('d.category = ?');
    values.push(category);
  }

  // Combine filters if any were added
  if (filters.length > 0) {
    sql += ' WHERE ' + filters.join(' AND ');
  }

  sql += ' GROUP BY d.id ORDER BY d.category';

  // Execute the final query
  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ message: 'Search failed' });
    res.json(results);
  });
};

// Export all order-related controllers
module.exports = {
  placeOrder,
  addRating,
  searchSales,
};