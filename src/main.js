import './styles/main.scss';
import { listenToStartButton } from './js/login.js';

const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', ()=>{
    listenToStartButton();
});

//function to regist new user
export const createUser = async (e) =>{
    e.preventDefault();

    const userName = document.getElementById('userNameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passWordRegister').value;
    console.log({ userName, email, password });
    try {
        const response = await fetch('http://localhost:3001/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, email, password })
        });
        if (!response.ok) {
            throw new Error('Error en el servidor');
        }

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Ocurrió un error en el registro');
    }
}
//function to login

export const loginUser = async (e) => {
    e.preventDefault();  

    const userName = document.querySelector('.loginUserName').value; 
    const password = document.querySelector('.loginPassWord').value;
    console.log('Datos a enviar:', { userName, password });

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password })
        });

        if (!response.ok) {
            throw new Error('Error al intentar iniciar sesión');
        }

        const data = await response.json();
        console.log(data);
        
            sessionStorage.setItem('userId', data.userId);



    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión');
    }
};













