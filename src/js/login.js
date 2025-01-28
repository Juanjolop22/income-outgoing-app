const startButton = document.querySelector('.start-button');

export const listenToStartButton = () => startButton.addEventListener('click', ()=>{
    const app = document.querySelector('#app');
    app.innerHTML = '';
    const form = document.createElement('form');
    form.innerHTML = `
        <h2>Iniciar sesión</h2>
        <input type="text" name="username" placeholder="Usuario" required><br>
        <input type="password" name="password" placeholder="Contraseña" required><br>
        <button type="submit">Entrar</button>
      `;
      app.append(form);
})