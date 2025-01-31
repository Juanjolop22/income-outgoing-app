import { createRegisterForm } from "./register.js";
const startButton = document.querySelector('.start-button');

export const listenToStartButton = () => startButton.addEventListener('click', ()=>{
    const app = document.querySelector('#app');
    app.innerHTML = '';
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer');
    app.append(formContainer);
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>Iniciar sesión</h2>
        <p class = "user">Ingresa tu usuario.</p>
        <input class = "inputForm1" type="text" name="username" placeholder="cooper321" required><br>
        <p>Ingresa tu contraseña.</p>
        <input class = "inputForm2" type="password" name="password" placeholder="kfe123" required><br>
        <button class = "formButton" type="submit">Entrar</button>
        <div class = 'to-register-div'><p>¿ya estás registrado?</p><button class = "registerButton">registrarse</button></div>
      `;
    formContainer.append(form);
    const registerButton = document.querySelector('.registerButton');
    registerButton.addEventListener('click', createRegisterForm);
})