import { displaySelectedCategories } from "./display-categories.js";
export const selectCategory = () =>{
   const container = document.querySelector('.container');
   const categoriesDiv = document.createElement('div');
   categoriesDiv.id = 'categories-div';
   categoriesDiv.innerHTML = `
    <div id="kind-of-category-div">
        <h2 id="categories-tittle">Elige La Categoria Que Deseas Consultar: </h2>
        <div class="categories-container">
            <div class="category-income-div">
                <button id="incomeButton">
                    <i class="fas fa-arrow-up" id ="fasfa-arrow-up"></i>
                </button>
                <p class="categories-text">Ingresos</p>
            </div>
            <div class="category-expense-div">
                <button id="expenseButton">
                    <i class="fas fa-arrow-down" id = "fasfa-arrow-down"></i>
                </button>
                <p class="categories-text">Egresos</p>
            </div>
        </div>
    </div>
   `;
   container.append(categoriesDiv);
   document.getElementById('incomeButton').addEventListener('click', displaySelectedCategories);
}