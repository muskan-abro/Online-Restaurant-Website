const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000; 

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '12345678', // replace with your MySQL password
  database: 'hmrestaurant',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint to fetch data from the hours_locations table
app.get('/hours_locations', (req, res) => {
  console.log('Request received for /hours_locations');
  pool.query('SELECT * FROM hours_locations', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Sending data to client:', results);
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
