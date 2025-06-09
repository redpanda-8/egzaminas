const db = require("../models/db"); // Import database connection

// GET all sales (for admin panel)
// This fetches all sales from the database, sorted by category
const getAllSales = (req, res) => {
  const sql = "SELECT * FROM sales ORDER BY category";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results); // Return list of all sales
  });
};

// POST a new sales
// Admin adds a new sales to the menu
const addSales = (req, res) => {
  const { name, description, price, photo, category } = req.body;

  // Basic validation
  if (!name || !price || !category) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  // Insert new sales into the database
  const sql = `INSERT INTO sales (name, description, price, photo, category) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [name, description, price, photo, category],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Insert failed" });
      res.status(201).json({ message: "Sale added successfully" });
    }
  );
};

// PUT (update) a sales
// Admin updates the information for an existing sales
const updateSale = (req, res) => {
  const { id } = req.params;
  const { name, description, price, photo, category } = req.body;

  // Update sales values in database by ID
  const sql = `UPDATE sales SET name=?, description=?, price=?, photo=?, category=? WHERE id=?`;
  db.query(
    sql,
    [name, description, price, photo, category, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed" });
      res.json({ message: "sales updated successfully" });
    }
  );
};

// DELETE a sales
// Admin deletes a sales by its ID
const deleteSale = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM sales WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "sales deleted successfully" });
  });
};

// Export all controller functions for use in routes
module.exports = {
  getAllSales,
  addSales,
  updateSale,
  deleteSale,
};
