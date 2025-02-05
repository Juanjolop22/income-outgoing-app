export const mainMenu = (app) =>{
    app.innerHTML = `
    <div class="container">
      <div class="current-money-div">
        <h1>Tu balance actual</h1>
        <p>$<span>100.00</span></p>
        <button class="addMoney-button">agregar dinero</button>
      </div>
    </div>`
    createFormToInsertMoney();
}

const createFormToInsertMoney = () =>{
    const addMoneyButton = document.querySelector('.addMoney-button');
    addMoneyButton.addEventListener('click', ()=>{
        const formToInsertMoney = document.createElement('form');
        formToInsertMoney.id = 'formToInsertMoney'; 
        formToInsertMoney.innerHTML = `<input type="text" id="inputInsertMoney" name="miInput" required>
        <button type="submit" id = "insertMoneyButton">agregar dinero</button>`;

        addMoneyButton.remove();
        document.querySelector('.current-money-div').append(formToInsertMoney);
        formToInsertMoney.addEventListener('submit', insertMoneyData);
    })
}

const insertMoneyData = async (e) =>{
    e.preventDefault();

    const moneyAmount = document.querySelector('#inputInsertMoney').value;
    const userId = sessionStorage.getItem('userId');
    console.log(userId, moneyAmount);
    
    if (!userId) {
        console.log('Usuario no autenticado');
        return;
    }

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
        console.log(data);
        
        if (data.message === 'Ingreso registrado con éxito'){
           console.log('exitoso ingreso del dinero');
        }
           
    } catch (error) {
        console.error('Error al agregar dinero:', error);
        alert('Ocurrió un error al intentar agregar dinero');
    }
};
