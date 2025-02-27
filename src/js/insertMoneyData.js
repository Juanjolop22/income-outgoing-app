export const insertMoneyData = async () =>{

    const moneyAmount = parseFloat(document.getElementById('inputInsertMoney').value.replace(/[^0-9.]/g, "")) ;
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