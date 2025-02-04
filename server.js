const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST,OPTIONS', allowedHeaders: 'Content-Type' }));

app.use(express.json()); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Halo4816470.',
    database: 'earnings_outgoings'
});


app.get('/', (req, res) => {
    res.status(200).json({ message: 'servidor funcionando' });
});

app.post('/registro', (req, res) => {
    const { userName, email, password } = req.body;
    console.log('Datos recibidos en el backend:', req.body); 

    const query = 'INSERT INTO users (userName, email, password) VALUES (?,?,?)';
    connection.query(query, [userName, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
        }
        res.status(200).json({ message: 'usuario registrado con éxito', userId: result.insertId });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar las credenciales', error: err });
        }
        if (result.length > 0) {
            res.status(200).json({ message: 'inicio de sesión exitoso', userId: result[0].id });
        } else {
            res.status(400).json({ message: 'credenciales incorrectas' });
        }
    });
});


app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});