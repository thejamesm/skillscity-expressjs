import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'user_database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

express.static.mime.define({'text/javascript': ['js']});

function getUsers(req, res) {
    db.all(`SELECT * FROM Users`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving users from database');
        } else {
            res.status(200).json(rows);
        }
    });
}

// Add an API endpoint to retrieve user data
app.get('/users', getUsers);


app.post('/addUser', (req, res) => {
    const { username, email } = req.body;

    db.run(`INSERT INTO Users (username, email) VALUES (?, ?)`, [username, email], err => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting user into database');
        } else {
            console.log(`A new user has been added with ID: ${this.lastID}`);
            res.status(200).send('User added successfully');
        }
    });
});

app.put('/editUser', (req, res) => {
    const { id, username, email } = req.body;
    db.run(`UPDATE Users
               SET username = ?, email = ?
             WHERE id = ?`, [username, email, id], err => {
        if (err) {
            console.error(`Error editing ID ${id}:`, err.message);
            res.status(500).send(`Error editing ID ${id}`);
        } else {
            console.log(`User ID ${id} edited successfully.`);
            getUsers(req, res);
        }
    });
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM Users WHERE id=?`, [id], err => {
        if (err) {
            console.error(`Error deleting ID ${id}:`, err.message);
            res.status(500).send(`Error deleting ID ${id}`);
        } else {
            console.log(`User ID ${id} deleted successfully.`);
            getUsers(req, res);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
