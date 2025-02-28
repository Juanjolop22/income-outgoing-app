import { handleEachButton } from "./header-menu.js";
export const displaySelectedCategories = () =>{
    let categoryDiv = document.getElementById('category-div');
    const kindOfCategory = document.getElementById('kind-of-category-div');

    if (!categoryDiv && kindOfCategory) {
        categoryDiv = document.createElement('div');
        categoryDiv.id = 'category-div' + 'Income';
        kindOfCategory.remove();
    }

    if (categoryDiv.id === 'category-divIncome') {
        categoryDiv.innerHTML = `
        <h2 id="income-tittle">Ingresos</h2>
        <div id="income-list">

        </div>
            <form id="add-income-form" class="income-form">
                <div class="input-group">
                    <label for="income-source">Fuente del ingreso:</label>
                    <input type="text" id="income-source" placeholder="Ej. Salario, Freelance" required>
                </div>
                <div class="input-group">
                    <label for="income-amount">Cantidad:</label>
                    <input type="number" id="income-amount" placeholder="Ej. 500" min="0" step="0.01" required>
                </div>
                <button type="submit" id="add-income-btn">Agregar ingreso</button>
            </form>
        `;
    }
    if (categoryDiv.id === 'category-divExpense') {
        categoryDiv.innerHTML = `
        <h2 id="expense-tittle">Egresos</h2>
        <div id="expense-list">
        </div>
            <form id="add-expense-form" class="expense-form">
                <div class="input-group">
                    <label for="expense-source">Motivo del egreso:</label>
                    <input type="text" id="expense-source" placeholder="Ej. Supermercado, Transporte" required>
                </div>
                <div class="input-group">
                    <label for="expense-amount">Cantidad:</label>
                    <input type="number" id="expense-amount" placeholder="Ej. 100" min="0" step="0.01" required>
                </div>
                <button type="submit" id="add-expense-btn">Agregar egreso</button>
            </form>
        `;
    }
    const categoriesDiv = document.getElementById('categories-div');
    categoriesDiv.append(categoryDiv);
} 