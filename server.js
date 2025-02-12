const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST,OPTIONS', allowedHeaders: 'Content-Type' }));

app.use(express.json()); 

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Halo4816470.',
    database: 'earnings_outgoings',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor funcionando' });
});

app.post('/registro', (req, res) => {
    const { userName, email, password } = req.body;
    console.log('Datos recibidos en el backend:', req.body);

    const query = 'INSERT INTO users (userName, email, password) VALUES (?,?,?)';
    pool.query(query, [userName, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
        }
        const userId = result.insertId;

        const queryEarnings = 'INSERT INTO earnings (user_id, amount) VALUES (?, 0)';
        pool.query(queryEarnings, [userId], (err) => {
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
    const { userName, password } = req.body;
    console.log('Datos recibidos en el servidor:', { userName, password });

    const query = 'SELECT * FROM users WHERE userName = ? AND password = ?';
    pool.query(query, [userName, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar las credenciales', error: err });
        }
        if (result.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', userId: result[0].id });
        } else {
            res.status(400).json({ message: 'Credenciales incorrectas' });
        }
    });
});

app.post('/insertMoney', (req, res) => {
    const { moneyAmount, userId } = req.body;
    if (!moneyAmount || !userId) {
        console.log('Datos incompletos:', req.body);
        return res.status(400).json({ message: 'Faltan moneyAmount o userId' });
    }

    console.log('Recibiendo request para insertar dinero:', { moneyAmount, userId });

    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
        }

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        pool.query('INSERT INTO earnings (user_id, amount) VALUES (?, ?)', [userId, moneyAmount], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el ingreso', error: err });
            }

            pool.query('SELECT SUM(amount) AS balance FROM earnings WHERE user_id = ?', [userId], (err, rows) => {
                if (err) {
                    console.error('Error al obtener el balance:', err);
                    return res.status(500).json({ message: 'Error al obtener el balance', error: err });
                }

                console.log('Resultado de la suma de ingresos:', rows);
                res.status(200).json({ message: 'Ingreso registrado con éxito', balance: rows[0].balance });
            });
        });
    });
});

app.get('/getUserBalance', (req, res) => {
    const { userId } = req.query;

    const query = `
    SELECT u.username, COALESCE(SUM(e.amount), 0) AS balance 
    FROM users u 
    LEFT JOIN earnings e ON u.id = e.user_id 
    WHERE u.id = ?;
`;

    pool.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error al obtener el balance' });
        }

        if (result.length === 0 || !result[0].username) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ username: result[0].username,
            balance: result[0].balance
         });
    });
});
app.post('/withdrawMoney', (req, res) =>{
    const {userId, moneyAmount} = req.body;

    const balanceQuery = `SELECT COALESCE(SUM(amount),0) AS balance FROM earnings WHERE user_Id = ?`;
    pool.query(balanceQuery, [userId], (err, result) =>{

        if (err) {
            return res.status(500).json({ message: 'Error al obtener el balance', error: err });
        }
        const currentBalance = result[0].balance;

        if (currentBalance < moneyAmount) {
            return res.status(400).json({ message: 'Fondos insuficientes' });
        }

        pool.query('INSERT INTO earnings (user_id, amount) VALUES (?, ?)', [userId, -moneyAmount], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el retiro', error: err });
            }

            pool.query(balanceQuery, [userId], (err, newResult) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al obtener el balance', error: err });
                }

                res.json({
                    message: 'Retiro registrado con éxito',
                    balance: newResult[0].balance
                });
            });
        });
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});