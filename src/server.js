const mysql = require('mysql2');
const http = require('http');
//const url = require('url');
//const parse = require('querystring');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Halo4816470.',
    database: 'earnings_outgoings'
});

const server = http.createServer((req, res)=>{
    res.setHeader('content-type', 'application/json');
    if (req.method === 'GET' && req.url === '/'){
        res.statusCode = 200;
        res.end(JSON.stringify({message: 'servidor funcionando'}));
    }
    if(req.method === 'POST' && req.url === '/registro'){
        let body = '';
        req.on('data', chunk =>{
            body += chunk;
        });
        req.on('end', () =>{
            const {userName, email, password} = JSON.parse(body);

            const query = 'INSERT INTO usuarios (userName, email, password) VALUES (?,?,?)';
            connection.query(query, [userName, email, password], err, result =>{
                if (err) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({message: 'Error al registrar el usuario', error: err}));
                    return;
                }
                res.statusCode = 200;
                res.end(JSON.stringify({message: 'usuario registrado con exito', userId: result.insertId}));
            });
        });
    }
    if(req.method === 'POST' && req.url === '/login'){
        let body = '';
        req.on('data', chunk =>{
            body += chunk;
        });

        req.on('end', () => {
            const {email, password} = JSON.parse(body);
            
            const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
            connection.query(query, [email, password], (err, result) =>{
                if(err){
                    res.statusCode = 500;
                    res.end(JSON.stringify({message: 'Error al verificar las credenciales', error: err}));
                    return
                }
                if (result.length > 0) {
                    res.statusCode = 200;
                    res.end(JSON.stringify({message: 'inicio de sesion exitoso', userId:result[0].id}));
                } else {
                    res.statusCode = 400;
                    res.end(JSON.stringify({message: 'credenciales incorrectas'}));
                }
            });
        });
    }
});
server.listen(3000, () =>{
    console.log('servidor escuchando en el puerto 3000');
    
})
/*connection.connect(err => {
    if (err) {
        console.error('Error:' + err.stack);
        return
    }
    console.log('conexion exitosa con ID:' + conection.threadId);
});/*

/*const userRegister = (userName, email, password) =>{
    const query = 'INSERT INTO USUARIOS (userName, email, password) VALUES (?, ?, ?)';
    connection.query(query, [userName, email, password], (err, result) =>{
        if(err){
            console.error('Error', err);
            return;
        }
        console.log('usuario registrado cond ID:', result.insertId);
    })
}
userRegister();*/