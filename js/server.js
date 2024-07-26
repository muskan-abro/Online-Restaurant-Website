const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8081; // Use the same port as in your AJAX request
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'hmrestaurant',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle form submissions
app.post('/process_reservation', (req, res) => {
    const { name, email, phone, date, time } = req.body;

    // Insert data into the database
    const sql = `INSERT INTO reservations (name, email, phone, date, time) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, email, phone, date, time];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL database:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            console.log('Reservation saved successfully');

            // Send a JSON response indicating success
            res.status(200).json({ message: 'Reservation saved successfully' });
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
