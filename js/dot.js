const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 8090;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// MySQL connection setup using mysql2
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'hmrestaurant'
});

// Connect to MySQL using mysql2
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Middleware to allow cross-origin resource sharing (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define routes
app.get('/menu', (req, res) => {
  const category = req.query.category;
  const sql = `SELECT * FROM menu_items WHERE category = ?`;
  
  // Use the promise-based query method for mysql2
  db.promise().query(sql, [category])
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
