import './scss/styles.scss';
import { listenToStartButton } from './js/login.js';
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', ()=>{
    listenToStartButton();
});


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











