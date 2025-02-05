import { createRegisterForm } from "./register.js";
import { loginUser } from "../main.js";
import { mainMenu } from "./main-menu.js";

export const listenToStartButton = () => {
  
  const app = document.querySelector('#app');
  app.innerHTML = '';
  const formContainer = document.createElement('div');
  formContainer.classList.add('formContainer');
  app.append(formContainer);
  const loginForm = document.createElement('form');
  loginForm.id = 'loginForm';
  loginForm.innerHTML = `
      <h2>Iniciar sesión</h2>
      <p class = "userLoginText">Ingresa tu usuario.</p>
      <input class = "loginUserName" type="text" name="username" placeholder="cooper321" required autocomplete="username"><br>
      <p>Ingresa tu contraseña.</p>
      <input class = "loginPassWord" type="password" name="password" placeholder="kfe123" required autocomplete="current-password"><br>
      <button class = "loginButton" type="submit">Entrar</button>
      <div class = 'to-register-div'><p>¿ya estás registrado?</p><button class = "registerButton">registrarse</button></div>
    `;
  formContainer.append(loginForm);

loginForm.querySelector('.registerButton').addEventListener('click', createRegisterForm);

goIntoMainMenu(loginForm, app);
}

const goIntoMainMenu = (loginForm, app) =>{
  loginForm.addEventListener('submit', async (e) => {

    try {
      await loginUser(e);

      app.innerHTML = '';
      mainMenu(app);

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  });
}

