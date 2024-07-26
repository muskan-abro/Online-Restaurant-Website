const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); // Import the mysql2 module
const app = express();
const port = 8083;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'hmrestaurant'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

app.post('/process_feedback', (req, res) => {
    const { name, email, message } = req.body;

    const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
    const values = [name, email, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        res.status(200).json({ message: 'Feedback saved successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
