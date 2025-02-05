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
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Cierra el proceso con error
    }
    console.log('Conectado a MySQL');
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
        const userId = result.insertId;

        const queryEarnings = 'INSERT INTO earnings (user_id, amount) VALUES (?, 0)';
        connection.query(queryEarnings, [userId], (err) => {
            if (err) {
                console.error('Error al insertar earnings:', err);
                return res.status(500).json({ 
                    message: 'Usuario registrado, pero error al crear ingresos', 
                    error: err.message
                });
            }

            res.status(200).json({ message: 'Usuario, cuenta y registro de ingresos creados con éxito', userId });
        });
    });
    

});

app.post('/login', (req, res) => {
    console.log(req.body);
    const { userName, password } = req.body;
    console.log('Datos recibidos en el servidor:', { userName, password });

    const query = 'SELECT * FROM users WHERE userName = ? AND password = ?';
    connection.query(query, [userName, password], (err, result) => {
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

app.post('/insertMoney', (req, res) => {
    const { moneyAmount, userId } = req.body;

    const queryCheckUser = 'SELECT * FROM users WHERE id = ?';
    connection.query(queryCheckUser, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const queryEarnings = 'INSERT INTO earnings (user_id, amount) VALUES (?, ?)';
        connection.query(queryEarnings, [userId, moneyAmount], (err) => {
            
            if (err) {
                return res.status(500).json({ message: 'Error al registrar los ingresos', error: err });
            }

            res.status(200).json({ message: 'Ingreso registrado con éxito' });
        });
    });
});


app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});