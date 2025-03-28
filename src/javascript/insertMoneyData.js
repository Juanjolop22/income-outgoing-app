export const insertMoneyData = async (type) => {
    const amountId = type === 'income' ? 'income-amount' : 'expense-amount';
    const descriptionId = type === 'income' ? 'income-description' : 'expense-description';
    const moneyAmount = parseFloat(document.getElementById(amountId).value.replace(/[^0-9.]/g, ""));
    const description = document.getElementById(descriptionId).value;
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
        console.error('No hay userId en sessionStorage');
        return;
    }
    const endpoint = type === 'income' ? 'http://localhost:3001/insertMoney' : 'http://localhost:3001/withdrawMoney';
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ moneyAmount, userId, description, type })
        });

        if (!response.ok) {
            throw new Error('Error al ingresar dinero');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (data.message === 'Ingreso registrado con éxito' || data.message === 'Retiro registrado con éxito') {
            const balanceElement = document.getElementById('money-balance');
            if (balanceElement) {
                balanceElement.textContent = new Intl.NumberFormat("en-US").format(data.balance);
            }
            const form = document.getElementById('add-income-form');
            if (form) form.reset();
        }
    } catch (error) {
        console.error('Error al agregar dinero:', error);
        alert('Ocurrió un error al intentar agregar dinero');
    }
};