import { createRegisterForm } from "./register.js";

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
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Intento de inicio de sesión');
});
loginForm.querySelector('.registerButton').addEventListener('click', createRegisterForm);
}

