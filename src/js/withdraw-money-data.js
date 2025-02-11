import { inputFirstLetter } from "./main-menu.js";
const withdrawMoneyData = async () =>{
    const moneyAmount = document.getElementById('inputInsertMoney').value.replace(/[^0-9.]/g, "");
    const userId = sessionStorage.getItem('userId');
    try{
        const response = await fetch('http://localhost:3001/withdrawMoney', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ moneyAmount, userId })
        });

        if (!response.ok) {
            throw new Error('Error al ingresar dinero');
        }

        const data = await response.json();
        if (response){
            const balanceElement = document.getElementById('money-balance');
            if (balanceElement) {
                balanceElement.textContent = new Intl.NumberFormat("en-US").format(data.balance);
            }
         };

    }catch(error){
        console.error('Error al retirar dinero:', error);
        alert('Ocurrió un error al intentar retirar dinero');
    }
};

export const createFormToWithdrawMoney = () =>{
    const withdrawMoneyMoneyButton = document.querySelector('.addMoney-button2');
    withdrawMoneyMoneyButton.addEventListener('click', ()=>{
        const formToWithdrawMoney = document.createElement('form');
        const balanceFormbuttons = document.querySelector('#balanceButtons');
        balanceFormbuttons.style.display = 'none';
        formToWithdrawMoney.id = 'formToWithdrawMoney'; 
        formToWithdrawMoney.innerHTML = `<input type="text" id="inputInsertMoney" name="miInput" placeholder = "¿cuanto retirarás?">
        <button type="submit" id = "insertMoneyButton">¡Retirar!</button>`;
        document.querySelector('.current-money-div').append(formToWithdrawMoney);
        formToWithdrawMoney.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const inputInsertMoney = document.getElementById('inputInsertMoney');
            const moneyValue = inputInsertMoney.value;
            if (moneyValue.startsWith("$ 0")) {
                console.log('Ingresa un número válido');
                alert('Por favor, ingresa un monto mayor que 0');
                return;
            } 
            if (moneyValue === '') {
                resetedForm();
                 return
            }

            await withdrawMoneyData();

            const resetedForm = () =>{
                inputInsertMoney.value = '';
                formToWithdrawMoney.remove();
                balanceFormbuttons.style.display = 'flex';
            }
            resetedForm();
        });
    inputFirstLetter();
    });    

};