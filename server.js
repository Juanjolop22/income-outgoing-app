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
    const { moneyAmount, userId, description, type } = req.body;

    if (!moneyAmount || !userId) {
        console.log('Datos incompletos:', req.body);
        return res.status(400).json({ message: 'Faltan moneyAmount o userId' });
    }

    console.log('Recibiendo request para insertar dinero:', { moneyAmount, userId, description, type });

    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
        }

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        pool.query(
            'INSERT INTO earnings (user_id, amount, description, type) VALUES (?, ?, ?, ?)',
            [userId, moneyAmount, description || null, type || 'income'],
            (err) => {
                if (err) {
                    console.error('Error al registrar el ingreso:', err);
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
            }
        );
    });
});

app.get('/getUserBalance', (req, res) => {
    const { userId } = req.query;

    const balanceQuery = `
    SELECT u.username, u.email, COALESCE(SUM(e.amount), 0) AS balance 
    FROM users u 
    LEFT JOIN earnings e ON u.id = e.user_id 
    WHERE u.id = ?
    GROUP BY u.id;
    `;
    const transactionsQuery = `
    SELECT amount, date AS transaction_date 
    FROM earnings 
    WHERE user_id = ? 
    ORDER BY date DESC;
    `;

    pool.query(balanceQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ message: 'Error al obtener el balance' });
        }

        if (result.length === 0 || !result[0].username) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        pool.query(transactionsQuery, [userId], (err, transactionsResult) => {
            if (err) {
                console.error('Error al consultar el historial de transacciones:', err);
                return res.status(500).json({ message: 'Error al obtener el historial de transacciones' });
            }

            res.json({ username: result[0].username,
               balance: result[0].balance,
               email: result[0].email,
               transactions: transactionsResult
            });
        });    
    });
});

app.post('/withdrawMoney', (req, res) => {
    const { moneyAmount, userId, description, type } = req.body;

    // Validación básica de datos requeridos
    if (!moneyAmount || !userId) {
        console.log('Datos incompletos:', req.body);
        return res.status(400).json({ message: 'Faltan moneyAmount o userId' });
    }

    console.log('Recibiendo request para retirar dinero:', { moneyAmount, userId, description, type });

    const balanceQuery = `SELECT COALESCE(SUM(amount), 0) AS balance FROM earnings WHERE user_id = ?`;
    pool.query(balanceQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error al obtener el balance:', err);
            return res.status(500).json({ message: 'Error al obtener el balance', error: err });
        }

        const currentBalance = result[0].balance;
        if (currentBalance < moneyAmount) {
            return res.status(400).json({ message: 'Fondos insuficientes' });
        }

        // Modificamos la consulta para incluir description y type
        const insertQuery = `INSERT INTO earnings (user_id, amount, description, type) VALUES (?, ?, ?, ?)`;
        pool.query(insertQuery, [userId, -moneyAmount, description || null, type || 'expense'], (err) => {
            if (err) {
                console.error('Error al registrar el retiro:', err);
                return res.status(500).json({ message: 'Error al registrar el retiro', error: err });
            }

            pool.query(balanceQuery, [userId], (err, newResult) => {
                if (err) {
                    console.error('Error al obtener el nuevo balance:', err);
                    return res.status(500).json({ message: 'Error al obtener el nuevo balance', error: err });
                }

                res.json({
                    message: 'Retiro registrado con éxito',
                    balance: newResult[0].balance
                });
            });
        });
    });
});

app.post('/api/movements', (req, res) => {
    const { moneyAmount, userId, description, type } = req.body;
    if (!moneyAmount || !userId || !type) {
        console.log('Datos incompletos:', req.body);
        return res.status(400).json({ message: 'Faltan moneyAmount, userId o type' });
    }

    console.log('Recibiendo request para registrar movimiento:', { moneyAmount, userId, description, type });

    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
        }

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const adjustedAmount = type === 'income' ? moneyAmount : -moneyAmount; // Ajustar signo según type

        pool.query(
            'INSERT INTO earnings (user_id, amount, description) VALUES (?, ?, ?)',
            [userId, adjustedAmount, description || null],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al registrar el movimiento', error: err });
                }

                pool.query('SELECT SUM(amount) AS balance FROM earnings WHERE user_id = ?', [userId], (err, rows) => {
                    if (err) {
                        console.error('Error al obtener el balance:', err);
                        return res.status(500).json({ message: 'Error al obtener el balance', error: err });
                    }

                    res.status(200).json({ message: 'Movimiento registrado con éxito', balance: rows[0].balance });
                });
            }
        );
    });
});

app.get('/api/movements', (req, res) => {
    const { type, userId } = req.query;

    if (!type || !userId) {
        return res.status(400).json({ message: 'Faltan type o userId en la consulta' });
    }

    const query = `
        SELECT id, description, amount, date 
        FROM earnings 
        WHERE user_id = ? AND amount ${type === 'income' ? '>' : '<'} 0 
        ORDER BY date DESC
    `;
    pool.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al consultar movimientos:', err);
            return res.status(500).json({ message: 'Error al obtener movimientos', error: err });
        }
        res.json(results);
    });
});

app.get('/getFinancialStats', (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'Falta el parámetro userId' });
    }

    const statsQuery = `
        SELECT 
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS totalIncome,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN -amount ELSE 0 END), 0) AS totalExpenses,
            COALESCE(SUM(ABS(amount)), 0) AS totalAbsolute
        FROM earnings 
        WHERE user_id = ?;
    `;

    pool.query(statsQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error al obtener estadísticas financieras:', err);
            return res.status(500).json({ message: 'Error al obtener estadísticas', error: err });
        }

        const { totalIncome, totalExpenses, totalAbsolute } = result[0];
        
        const incomePercentage = totalAbsolute > 0 ? (totalIncome / totalAbsolute) * 100 : 0;
        const expensePercentage = totalAbsolute > 0 ? (totalExpenses / totalAbsolute) * 100 : 0;

        res.json({
            totalIncome,
            totalExpenses,
            incomePercentage: Number(incomePercentage.toFixed(2)), 
            expensePercentage: Number(expensePercentage.toFixed(2))
        });
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});