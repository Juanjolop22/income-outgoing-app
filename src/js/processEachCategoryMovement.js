import { handleEachButton } from "./header-menu.js";
import {saveMovementsInDataBase} from "./displayAllMovements.js";
import { displaySelectedCategories } from "./display-categories.js";
import { moveMovementsListToEnd } from "./displayAllMovements.js";
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
        const movementsList = document.getElementById('movements-list'); 
        container.append(categoryType, movementsList);
        document.getElementById('back-button').addEventListener('click', ()=>{
            moveMovementsListToEnd(categoryType, () => displaySelectedCategories(type), container, movementsList);
        });
        saveMovementsInDataBase(type);
    }
};

const createIncomeDivAndForm = (categoryType, categoryTypeId, kindCategoryType, categoryDate, type) =>{
    categoryType.id = categoryTypeId;
    categoryType.classList.add('every-category-div');
    const title = type === 'income' ? 'Describe Tu ingreso' : 'Describe Tu egreso';
    const inputId = type === 'income' ? 'income-description' : 'expense-description';
    categoryType.innerHTML = `
    <div id="backButtonDiv2">
        <button id="back-button">
            <i class="fas fa-arrow-left" id="arrow-left"></i>
        </button>
    </div>
    <div class = "divIncomesForm">
        <form id="add-income-form" class="income-form">
            <div class="input-group">
                <label for="${inputId}">${title}</label>
                <input type="text" id="${inputId}" placeholder="Ej. ${kindCategoryType}, ${categoryDate} " required>
            </div>
        </form>
    </div>   
    `; 
}

const createQuantityInput = (form, type) =>{
    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('input-group');
    const labelText = type === 'income' ? 'Cuanto va a entrar:' : 'Cuanto va a salir:';
    const inputId = type === 'income' ? 'income-amount' : 'expense-amount';
    quantityDiv.innerHTML = `    
    <label for="${inputId}">${labelText}</label>
    <input type="number" id="${inputId}" placeholder="Ej. 500,000" min="0" step="0.01" required>
    `;
    const quantityDivButton = document.createElement('div');
    quantityDivButton.id = 'quantityDiv';
    const buttonText = type === 'income' ? '¡Ingresar!' : '¡Retirar!';
    const buttonClass = type === 'income' ? 'add-income-btn' : 'add-expense-btn';
    quantityDivButton.innerHTML = `<button class = '${buttonClass}'>${buttonText}</button>`;
    form.append(quantityDiv, quantityDivButton);
}




