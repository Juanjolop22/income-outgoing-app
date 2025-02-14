export const transformTransactions = (data) =>{
const transactions = data.transactions;
const formatedTransaction = transactions.map(trs =>({
     ...trs,
     transaction_type: trs.amount >= 0 ? 'Ingreso' : 'Egreso'
  }));
  displayEachTransaction(formatedTransaction)
}

let allTransactions = [];
const displayEachTransaction = (formatedTransaction) =>{
    for( let  i = 0; i < formatedTransaction.length; i++){
        allTransactions.push(formatedTransaction[i]);
    const createLiElements = document.createElement('li');
            
    createLiElements.innerHTML = `<p>Dinero Ingresado<span>${allTransactions[i].amount}
    </span> Fecha: <span>${allTransactions[i].transaction_date}
    </span><span>${allTransactions[i].transaction_type}</span></p>`;
    const ulContainer = document.querySelector('#transactionsList');
    ulContainer.append(createLiElements);
    }
    console.log(allTransactions);



}