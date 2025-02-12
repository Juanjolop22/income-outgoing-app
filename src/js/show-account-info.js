let infoRequired = ['myAccount', 'transactions', 'about us'];
const AccountInfo = () =>{
    const divInfo = document.createElement('div');
    if(infoRequired[0] === 'myAccount'){
        divInfo.id = 'myAccountDivInfo';
        divInfo.innerHTML = `
        <h2>Informacion De Mi Cuenta</h2>
        <p>Nombre: <span>${username}</span></p>
        <p>Balance actual: ${balance}</p>
        `;
    }
    if(infoRequired[1] === 'transactions'){
        divInfo.id = 'transactionsDivInfo';
        divInfo.innerHTML = `
        <h2>Historial de transacciones</h2>
        <ul></ul>
        `;
    }
    if(infoRequired[2] === 'about us'){
                divInfo.id = 'transactionsDivInfo';
        divInfo.innerHTML = `
        <h2>Nosotros</h2>
        <p>Desarrollado por: Juan José López</p>
        <p>Contacto:juanjoselop@hot.co</p>
        <p>Lenguajes Utilizados: html, css/sass, javaScript, node.js/express</p>
        `;
    }
}