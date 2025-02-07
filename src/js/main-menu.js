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

        // Asegúrate de que data.balance exista antes de intentar mostrarlo
        const balance = data.balance || 0;

        app.innerHTML = `
        <div class="container">
          <div class="current-money-div">
            <h1>Tu balance actual</h1>
            <p>$<span id="money-balance">${new Intl.NumberFormat("en-US").format(balance)}</span></p>
            <button class="addMoney-button">Agregar dinero</button>
          </div>
        </div>`;

        createFormToInsertMoney();

    } catch (error) {
        console.error('Error al obtener el balance:', error);
        alert('Error al cargar el balance. Por favor, intenta nuevamente.');
    }
};

const createFormToInsertMoney = () =>{
    const addMoneyButton = document.querySelector('.addMoney-button');
    addMoneyButton.addEventListener('click', ()=>{
        const formToInsertMoney = document.createElement('form');
        addMoneyButton.style.display = 'none';
        formToInsertMoney.id = 'formToInsertMoney'; 
        formToInsertMoney.innerHTML = `<input type="text" id="inputInsertMoney" name="miInput" placeholder = "¿cuanto agregaras?" required>
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

            await insertMoneyData();

            
            inputInsertMoney.value = '';
            formToInsertMoney.remove();
            addMoneyButton.style.display = 'block';
        });
        inputFirstLetter();
    });
}

const inputFirstLetter = () =>{
    document.getElementById('inputInsertMoney').addEventListener("input", function () {
        
        if (!this.value.startsWith("$")) {
            this.value = "$" + this.value.replace("$", ""); 
        }
        let numberValue = this.value.replace(/[^0-9]/g, ""); 

        let valorFormateado = new Intl.NumberFormat("en-US").format(numberValue);
        this.value = "$" +' '+ valorFormateado;
    });
}

const insertMoneyData = async () =>{

    const moneyAmount = document.getElementById('inputInsertMoney').value.replace(/[^0-9.]/g, "");
    const userId = sessionStorage.getItem('userId');
    console.log('userId obtenido de sessionStorage:', userId);
    console.log(moneyAmount, userId);
    
    if (!userId) return;
    console.log(userId);
    console.log("Data being sent:", { moneyAmount, userId });

    try { 
        const response = await fetch('http://localhost:3001/insertMoney', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ moneyAmount, userId })
        });

        if (!response.ok) {
            throw new Error('Error al ingresar dinero');
        }

        const data = await response.json();
        console.log(data.balance);

        if (data.message === 'Ingreso registrado con éxito'){
            const balanceElement = document.getElementById('money-balance');
            if (balanceElement) {
                balanceElement.textContent = new Intl.NumberFormat("en-US").format(data.balance);
            }
         }
        
    } catch (error) {
        console.error('Error al agregar dinero:', error);
        alert('Ocurrió un error al intentar agregar dinero');
    }
};
