const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const secretKey = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

 
const db = new sqlite3.Database('./fnmoney.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            mobileNumber TEXT NOT NULL,
            githubLink TEXT NOT NULL,
            websiteLink TEXT NOT NULL,
            experience TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating assessments table:', err.message);
            }
        });
    }
});

// Endpoint to register a user
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered');
    });
});

// Endpoint to log in a user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send('Invalid email or password');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

 
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
 
app.post('/api/assessments', authenticateJWT, (req, res) => {
    const { email, mobileNumber, githubLink, websiteLink, experience } = req.body;

    if (!email || !mobileNumber || !githubLink || !websiteLink || !experience) {
        return res.status(400).send('All fields are required');
    }

    db.run('INSERT INTO assessments (email, mobileNumber, githubLink, websiteLink, experience) VALUES (?, ?, ?, ?, ?)',
        [email, mobileNumber, githubLink, websiteLink, experience], (err) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.status(201).send('Assessment submitted');
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
