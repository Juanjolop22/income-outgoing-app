import { handleEachButton } from "./header-menu.js";
const displaySelectedCategories = () =>{
    let categoryDiv = document.getElementById('category-div');
    const categoriesDiv = document.getElementById('categories-div');

    if (!categoryDiv && categoriesDiv) {
        categoryDiv = document.createElement('div');
        categoryDiv.id = 'category-div' + infoType;
        categoriesDiv.remove('kind-of-category-div');
        return
    }

    if (categoryDiv.id === 'category-divIncome') {
        categoryDiv.innerHTML = `
        <div id = "div-incomes">
           
        </div>
        `;
        
    }

    



} 