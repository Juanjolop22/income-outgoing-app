import { processEachMovement } from "./processEachCategoryMovement.js";
import {displayMovementsList} from "./displayAllMovements.js";
import { selectCategory } from "./choose-category.js";
import { moveMovementsListToEnd } from "./displayAllMovements.js";

/*export const getOrCreateMovementsList = () => {
    let movementsList = document.getElementById('movements-list');
    const existingLists = document.querySelectorAll('#movements-list');
    
    if (existingLists.length > 1) {
        existingLists.forEach((list, index) => {
            if (index > 0) list.remove();
        });
        movementsList = document.getElementById('movements-list');
    }

    if (!movementsList) {
        movementsList = document.createElement('div');
        movementsList.id = 'movements-list';
        console.log('Creando nuevo movementsList');
    }

    return movementsList;
};*/

export const displaySelectedCategories = (type) =>{
    let categoryDiv = document.getElementById('category-div');
    let categoriesDiv = document.getElementById('categories-div');
    let movementsList = document.getElementById('movements-list');
    const container = document.querySelector('.container');

    if (categoriesDiv) {
        categoriesDiv.remove();
    }

    if (!categoryDiv) {
        categoryDiv = document.createElement('div');
        categoryDiv.id = `category-div${type === 'income' ? 'Income' : 'Expense'}`;
    }

    if (!movementsList) {
        movementsList = document.createElement('div');
        movementsList.id = 'movements-list';
        console.log('Creando movementsList por primera vez');
    }

    if (type === 'income') {
        categoryDiv.innerHTML = `
        <h2 id="income-tittle">Selecciona el tipo de ingreso:</h2>
        <div id="backButtonDiv">
            <button class="back-btn">
                <i class="fas fa-arrow-left" id="arrow-left"></i>
            </button>
        </div>
        <div id="eachIncomeCategorie">
            <div id="salaryDiv">
                <label class="salary-label categories">
                    <button class="salary-btn categorieButtons">
                        <i class="fas fa-money-bill-wave" id="salary-i"></i>
                    </button>
                    <span>Salario</span>
                </label>
            </div>
            <div id="freelanceDiv">
                <label class="freelance-label categories">
                    <button class="freelance-btn categorieButtons">
                        <i class="fas fa-user-tie" id="freelance-i"></i>
                    </button>
                    <span>Freelance</span>
                </label>
            </div>
            <div id="bussinessDiv">
                 <label class="business-label categories">
                    <button class="business-btn categorieButtons">
                        <i class="fas fa-briefcase" id="business-i"></i>
                    </button>
                    <span>Negocios</span>
                </label>
            </div>
            <div id="pensionDiv">
                <label class="pension-label categories">
                    <button class="pension-btn categorieButtons">
                        <i class="fas fa-piggy-bank" id="pension-i"></i>
                    </button>
                    <span>Pensión</span>
                </label>
            </div>
        </div>
        `;
    }

    if (type === 'expense') {
        categoryDiv.innerHTML = `
        <h2 id="expense-tittle">Selecciona el tipo de egreso:</h2>
        <div id="backButtonDiv">
            <button class="back-btn ">
                <i class="fas fa-arrow-left" id="arrow-left"></i>
            </button>
        </div>
        <div id="eachExpenseCategorie">
            <div id="housingDiv">
                <label class="housing-label categories">
                    <button class="housing-btn categorieButtons">
                        <i class="fas fa-home" id="housing-i"></i>
                    </button>
                    <span>Vivienda</span>
                </label>
            </div>
            <div id="transportDiv">
                <label class="transport-label categories">
                    <button class="transport-btn categorieButtons">
                        <i class="fas fa-car" id="transport-i"></i>
                    </button>
                    <span>Transporte</span>
                </label>
            </div>
            <div id="foodDiv">
                <label class="food-label categories">
                    <button class="food-btn categorieButtons">
                        <i class="fas fa-utensils" id="food-i"></i>
                    </button>
                    <span>Alimentación</span>
                </label>
            </div>
            <div id="entertainmentDiv">
                <label class="entertainment-label categories">
                    <button class="entertainment-btn categorieButtons">
                        <i class="fas fa-film" id = "film-i"></i>
                    </button>
                    <span>Ocio</span>
                </label>
            </div>
        </div>
        `;
    }
    container.append(categoryDiv, movementsList);
    categoryDiv.querySelector('.back-btn').addEventListener('click', ()=>{
        backToChooseCategory(categoryDiv, movementsList);
    });
    processEachMovement(type);
    displayMovementsList(type);

}; 

const backToChooseCategory = (categoryDiv, movementsList) =>{
    movementsList.remove();
    moveMovementsListToEnd(categoryDiv, () => selectCategory(), null, null);
};



