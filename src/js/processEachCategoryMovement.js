import { handleEachButton } from "./header-menu.js";
import { displaySelectedCategories } from "./display-categories.js";
export const processEachMovement = (type) =>{
    const categoryButtons = {
        income: {
            'salary-btn': 'salary',
            'freelance-btn': 'freelance',
            'business-btn': 'business',
            'pension-btn': 'pension'
        },
        expense: {
            'housing-btn': 'housing',
            'transport-btn': 'transport',
            'food-btn': 'food',
            'entertainment-btn': 'entertainment'
        }
    };
    const buttons = categoryButtons[type] || categoryButtons['income'];
    console.log(categoryButtons);
    
    handleEachButton(buttons, null, null, (buttonId, section) => selectCategoryType(buttonId, type, section));
};

const selectCategoryType = (buttonId, type, section) => {
    const button = document.querySelector(`.${buttonId}`);
    if (button) {
        button.addEventListener('click', () => {
            incomeTypeContent(type, section);
        });
    }
};

const incomeTypeContent = (type, section) => {
    const categoryType = document.createElement('div');

    const config = {
        income: {
            'salary': { id: 'salary-type-income', 
                kind: 'sueldo', 
                date: 'mensualidad'},
            'freelance': { id: 'freelance-type-income',
                 kind: 'Ingreso individual',
                 date: 'Fecha Ingresos' },
            'business': { id: 'business-type-income',
                 kind: 'Cantidad ingresos',
                 date: 'Ingresos por día' },
            'pension': { id: 'pension-type-income',
                 kind: 'Mesada',
                 date: 'Mensual' }
        },
        expense: {
            'housing': { id: 'housing-type-expense',
                 kind: 'Alquiler',
                 date: 'Mensual' },
            'transport': { id: 'transport-type-expense',
                 kind: 'Gasolina',
                 date: 'Semanal' },
            'food': { id: 'food-type-expense',
                 kind: 'Compra',
                 date: 'Semanal' },
            'entertainment': { id: 'entertainment-type-expense',
                 kind: 'Salida',
                 date: 'Fin de semana' }
        }
    };
    console.log(config.expense.housing);
    
    const typeConfig = config[type][section];
    if (typeConfig) {
        createIncomeDivAndForm(categoryType, typeConfig.id, typeConfig.kind, typeConfig.date, type);
        const form = categoryType.querySelector('#add-income-form');
        createQuantityInput(form, type);
        const categoryDiv = document.getElementById(`category-div${type === 'income' ? 'Income' : 'Expense'}`);
        categoryDiv.remove();
        const container = document.querySelector('.container');
        container.append(categoryType);
        document.getElementById('back-button').addEventListener('click', ()=>{
            categoryType.remove(); 
            displaySelectedCategories(type);
        });
    }
};

const createIncomeDivAndForm = (categoryType, categoryTypeId, kindCategoryType, categoryDate, type) =>{
    categoryType.id = categoryTypeId;
    categoryType.classList.add('every-category-div');
    const title = type === 'income' ? 'Describe Tu ingreso' : 'Describe Tu egreso';
    categoryType.innerHTML = `
    <div id="backButtonDiv2">
        <button id="back-button">
            <i class="fas fa-arrow-left" id="arrow-left"></i>
        </button>
    </div>
    <div class = "divIncomesForm">
        <form id="add-income-form" class="income-form">
            <div class="input-group">
                <label for="income-description">${title}</label>
                <input type="text" id="income-description" placeholder="Ej. ${kindCategoryType}, ${categoryDate} " required>
            </div>
        </form>
    </div>   
    `; 
}

const createQuantityInput = (form, type) =>{
    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('input-group');
    const labelText = type === 'income' ? 'Cuanto va a entrar:' : 'Cuanto va a salir:';
    quantityDiv.innerHTML = `    
    <label for="income-amount">${labelText}</label>
    <input type="number" id="income-amount" placeholder="Ej. 500,000" min="0" step="0.01" required>
    `;
    const quantityDivButton = document.createElement('button');
    quantityDivButton.classList.add('add-income-btn');
    form.append(quantityDiv, quantityDivButton);
}




