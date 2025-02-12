export const withdrawMoneyData = async () =>{
    const moneyAmount = document.getElementById('inputWithdrawMoney').value.replace(/[^0-9.]/g, "");
    console.log(moneyAmount);
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
