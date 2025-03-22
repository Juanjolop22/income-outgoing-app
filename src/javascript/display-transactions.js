export const transformTransactions = (data) =>{
const transactions = data.transactions;

const formatedTransaction = transactions.map(trs =>({
     ...trs,
     transaction_type: Number(trs.amount) === 0 ? 'No hubo movimiento' : (trs.amount > 0 ? 'Ingreso' : 'Egreso')
  }));
  displayEachTransaction(formatedTransaction)
}

const displayEachTransaction = (formatedTransaction) =>{
let allTransactions = [];

    for( let  i = 0; i < formatedTransaction.length; i++){

       allTransactions.push(formatedTransaction[i]);
       const amount = allTransactions[i].amount;
       const formattedAmount = Number(amount).toLocaleString('en-US');  
       const amountSpan = document.createElement('span');
        amountSpan.textContent = formattedAmount; 

        if (amount < 0) {
           amountSpan.id = 'makeNumberRed';
        } else if (amount > 0) {
           amountSpan.id = 'makeNumberGreen';
        }

        const typeSpan = document.createElement('span');
        typeSpan.textContent = allTransactions[i].transaction_type;
        if (allTransactions[i].transaction_type === 'Ingreso') {
           typeSpan.id = 'makeTextGreen';
        } else if (allTransactions[i].transaction_type === 'Egreso') {
          typeSpan.id = 'makeTextRed';
        } else if (allTransactions[i].transaction_type === 'No hubo movimiento') {
          typeSpan.id = 'makeTextGray'; 
       }

       const createLiElements = document.createElement('li');
       createLiElements.innerHTML = 
       `<p>Movimiento: 
           <span>${amountSpan.outerHTML}</span> 
           Fecha: <span>${formatDateTime(allTransactions[i].transaction_date)}. </span>
           <span>${typeSpan.outerHTML}</span>
       </p>`;
       const ulContainer = document.querySelector('#transactionsList');
       ulContainer.append(createLiElements);
    }
    console.log(allTransactions);
}

const formatDateTime = (isoString) => {
    return new Date(isoString).toISOString().slice(0, 19).replace('T', ' ');
  }