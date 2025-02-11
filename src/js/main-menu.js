import { insertMoneyData } from "./insertMoneyData.js";
import { handleCreateHeader } from "./header-menu.js";
import { createFormToWithdrawMoney } from "./withdraw-money-data.js";
export const mainMenu = async (app) => {
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
        console.error('User ID no encontrado en sessionStorage');
        return alert('No se ha iniciado sesión correctamente.');
    }
    
    console.log('userId:', userId);

    try {
        console.log('Haciendo petición a /getUserBalance...');
        const response = await fetch(`http://localhost:3001/getUserBalance?userId=${userId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        handleCreateHeader(data.username, app);
        app.innerHTML += `
        <div class="container">
          <div class="current-money-div">
            <h1>Tu balance actual</h1>
            <p>$ <span id="money-balance">${new Intl.NumberFormat("en-US").format(data.balance)}</span></p>
            <div id ="balanceButtons">
                <button class ="addMoney-button">Agregar dinero</button>
                <button class ="addMoney-button2">Retirar dinero</button>
            </div>
          </div>
        </div>`;

        createFormToInsertMoney();
        createFormToWithdrawMoney();
        app.classList.add('app-background');

    } catch (error) {
        console.error('Error al obtener el balance:', error);
        alert('Error al cargar el balance. Por favor, intenta nuevamente.');
    }
};

const createFormToInsertMoney = () =>{
    const addMoneyButton = document.querySelector('.addMoney-button');
    addMoneyButton.addEventListener('click', ()=>{
        const formToInsertMoney = document.createElement('form');
        const balanceFormbuttons = document.querySelector('#balanceButtons');
        balanceFormbuttons.style.display = 'none';
        formToInsertMoney.id = 'formToInsertMoney'; 
        formToInsertMoney.innerHTML = `<input type="text" id="inputInsertMoney" name="miInput" placeholder = "¿cuanto agregaras?">
        <button type="submit" id = "insertMoneyButton">¡Listo!</button>`;

        document.querySelector('.current-money-div').append(formToInsertMoney);
        formToInsertMoney.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const inputInsertMoney = document.getElementById('inputInsertMoney');
            const moneyValue = inputInsertMoney.value;
            if (moneyValue.startsWith("$ 0")) {
                console.log('Ingresa un número válido');
                alert('Por favor, ingresa un monto mayor que 0');
                return;
            } 
            const resetForm = () =>{
                inputInsertMoney.value = '';
                formToInsertMoney.remove();
                balanceFormbuttons.style.display = 'flex';
            }
            
            if (moneyValue === '') {
                resetForm();
                 return
            }

            await insertMoneyData();


            resetForm();
        });
        inputFirstLetter();
    });
}

export const inputFirstLetter = () =>{
    document.getElementById('inputInsertMoney').addEventListener("input", function () {
        
        if (!this.value.startsWith("$")) {
            this.value = "$" + this.value.replace("$", ""); 
        }
        let numberValue = this.value.replace(/[^0-9]/g, ""); 

        let valorFormateado = new Intl.NumberFormat("en-US").format(numberValue);
        this.value = "$" +' '+ valorFormateado;
    });
}


