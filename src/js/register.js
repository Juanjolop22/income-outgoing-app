import { listenToStartButton } from "./login.js";
import { createUser } from "../main.js";

export const createRegisterForm = () =>{
    const formContainer = document.querySelector('.formContainer');
    formContainer.innerHTML = '';
    registerFormContent(formContainer);
}

const registerFormContent = (formContainer) =>{
    console.log(formContainer);
    
    const registerForm = document.createElement('form');
    registerForm.id = 'registerForm';
    registerForm.innerHTML = `
        <h2>Registrate</h2>
        <p class = "email-text">¿cuál es tu correo?</p>
        <input id = "emailRegister" type="email" name="email" placeholder="murph6@example.com" required autocomplete="email"><br>
        <p class = "user-text">Crea un nombre de usuario.</p>
        <input id = "userNameRegister" type="text" name="username" placeholder="murph567" required autocomplete="username"><br>
        <p>Crea una contraseña.</p>
        <input id = "passWordRegister" type="password" name="password" placeholder="dante321" required autocomplete="new-password"><br>
        <button class = "registButton" type="submit">Crear Cuenta</button>
        <div class = 'to-register-div'><p>¿ya tienes cuenta?</p><button class = "logInButton">Inicia sesión</button></div>
      `;
      formContainer.append(registerForm);
      document.querySelector('.logInButton').addEventListener('click', listenToStartButton);
      console.log(registerForm);
      
      registerForm.addEventListener('submit', createUser);
}

export const succesfullRegist = (userName) =>{
  const registerForm = document.querySelector('#registerForm');  
  const welcomeMessage = document.createElement('p');
  welcomeMessage.classList.add('welcomeText');
  welcomeMessage.innerHTML = '¡Registro existoso! Bienvenido, ' + userName;
  registerForm.append(welcomeMessage);
}
