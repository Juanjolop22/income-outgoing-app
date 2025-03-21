import { handleCreateHeader } from "./header-menu.js";
import { selectCategory } from "./choose-category.js";

export const mainMenu = async (app) => {
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
        console.error('User ID no encontrado en sessionStorage');
        return alert('No se ha iniciado sesión correctamente.');
    }
    
    try {
        const response = await fetch(`http://localhost:3001/getUserBalance?userId=${userId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        handleCreateHeader(data, app);
        app.innerHTML += `
        <div class="container">
          <div class="current-money-div">
            <h1>Tu balance actual</h1>
            <p>$ <span id="money-balance">${new Intl.NumberFormat("en-US").format(data.balance)}</span></p>

          </div>
        </div>`;
        selectCategory();

        app.classList.add('app-background');

    } catch (error) {
        console.error('Error al obtener el balance:', error);
        alert('Error al cargar el balance. Por favor, intenta nuevamente.');
    }
};

export const inputFirstLetter = (input) =>{
    document.getElementById(`${input}`).addEventListener("input", function () {
        
        if (!this.value.startsWith("$")) {
            this.value = "$" + this.value.replace("$", ""); 
        }
        let numberValue = this.value.replace(/[^0-9]/g, ""); 

        let valorFormateado = new Intl.NumberFormat("en-US").format(numberValue);
        this.value = "$" +' '+ valorFormateado;
    });
}


