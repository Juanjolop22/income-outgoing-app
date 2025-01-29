export const createRegisterForm = () =>{
    const formContainer = document.querySelector('.formContainer');
    formContainer.innerHTML = '';
    registerFormContent(formContainer);
}

const registerFormContent = (formContainer) =>{
    const registerForm = document.createElement('form');
    registerForm.innerHTML = `
        <h2>Rgistrate</h2>
        <p class = "user">Elige un nombre de usuario.</p>
        <input class = "inputForm1" type="text" name="username" placeholder="murph567" required><br>
        <p>Elige tu contraseña.
        <input class = "inputForm2" type="password" name="password" placeholder="dante321" required><br>
        <button class = "formButton" type="submit">Crear Cuenta.</button>
      `;
      formContainer.append(registerForm);
}