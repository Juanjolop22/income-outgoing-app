export const saveMovementsInDataBase = (type) =>{
    const form = document.getElementById('add-income-form');
    form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const inputDescriptionId = type === 'income' ? 'income-description' : 'expense-description';
        const inputAmountId = type === 'income' ? 'income-amount' : 'expense-amount';
        const description = document.getElementById(inputDescriptionId).value;
        const amount = parseFloat(document.getElementById(inputAmountId).value);
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            console.error('No hay userId en sessionStorage. Por favor, inicia sesión.');
            return;
        }

        const movementData = {
            type: type,
            description: description,
            amount: amount,
            userId: userId
        };

        try {
            const response = await fetch('http://localhost:3001/api/movements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movementData)
            });

            const result = await response.json();
            console.log(result.message);

            form.reset();

        }catch (error) {
            console.error('Error al guardar el movimiento:', error);
        }    
    });
}

export const displayMovementsList = async (type) => {
    const movementsList = document.getElementById('movements-list');

    // Obtener el userId desde sessionStorage
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        movementsList.innerHTML = '<p>Por favor, inicia sesión para ver tus movimientos.</p>';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/movements?type=${type}&userId=${userId}`);
        const movements = await response.json();
        console.log(movements);

        movementsList.innerHTML = '<h3>Movimientos Registrados</h3>';
        const ul = document.createElement('ul');
        movements.forEach(movement => {
            const formatter = new Intl.NumberFormat('en-US');
            const formattedAmount = formatter.format(Math.abs(movement.amount));
            const li = document.createElement('li');
            li.innerHTML = `${movement.description}  $${formattedAmount} <span>(${new Date(movement.date).toLocaleDateString()})</span>`;
            ul.appendChild(li);
        });
        movementsList.appendChild(ul);
        console.log(movements);
        
    } catch (error) {
        console.error('Error al cargar movimientos:', error);
        movementsList.innerHTML = '<p>Error al cargar los movimientos</p>';
    }
};

export const moveMovementsListToEnd = (elementToRemove, nextAction, container, movementsList) => {
    
    if (elementToRemove) elementToRemove.remove();
    if (nextAction) nextAction(); 
    if (movementsList) container.append(movementsList); 
};