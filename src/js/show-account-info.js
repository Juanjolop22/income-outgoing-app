import { transformTransactions } from "./display-transactions.js";

export const AccountInfo = (infoType, data, app) =>{
    hideMainInfo();
    let infoContainer = document.getElementById('infoContainer');

    if (!infoContainer) {
        infoContainer = document.createElement('div');
        infoContainer.id = 'infoContainer';
        app.append(infoContainer);
    }

    if (document.getElementById(infoType + 'DivInfo')) {
        return;
    }

    infoContainer.innerHTML = '';

    let divInfo = document.createElement('div');
    divInfo.id = infoType + 'DivInfo';

    if (infoType === 'myAccount') {
        divInfo.innerHTML = `
            <h2>Información De Mi Cuenta</h2>
            <p>Nombre: <span>${data.username}</span></p>
            <p>Correo: <span>${data.email}</span></p>
            <p>Balance actual: $ ${balanceToReadableNumber(data.balance)}</p>
            <div id = "returnToMenuDiv">
              <button id = "returnToMenuButton">Volver al menú</button>
            </div>
            
        `;
    } else if (infoType === 'transactions') {
        divInfo.innerHTML = `
            <h2>Historial de transacciones</h2>
            <ul id = "transactionsList"></ul>
            <div id = "returnToMenuDiv">
              <button id = "returnToMenuButton">Volver al menú</button>
            </div>
        `;
        setTimeout(() => {
             transformTransactions(data);
        }, 10);
    } else if (infoType === 'about us') {
        divInfo.innerHTML = `
            <h2>Nosotros</h2>
            <p>Desarrollado por: Juan José López</p>
            <p>Contacto: juanjoselop@hot.co</p>
            <p>Lenguajes Utilizados: HTML, CSS/Sass, JavaScript, Node.js/Express</p>
            <div id = "returnToMenuDiv">
              <button id = "returnToMenuButton">Volver al menú</button>
            </div>
        `;
    }
    infoContainer.append(divInfo);
    document.getElementById('returnToMenuButton').addEventListener('click', ()=>{
        infoContainer.remove();
        document.querySelector('.container').style.display = "flex";
    });;
};

const hideMainInfo = () =>{
    document.querySelector('.container').style.display = "none";
    const hideDivNav = document.querySelector('#divNav');
    hideDivNav.classList.remove('show-menu');
    setTimeout(() => {
        divNav.remove(); 
    }, 500); 
}

const balanceToReadableNumber = (data) =>{
    let numberValue = Number(data.replace(/,/g, "").trim()); 
    return new Intl.NumberFormat("en-US").format(numberValue);
}
