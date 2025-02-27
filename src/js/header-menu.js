import { AccountInfo} from "./show-account-info.js";
export const handleCreateHeader = (data, app) =>{
    console.log(app);
    const createHeader = document.createElement('header');
    createHeader.id = 'main-header';
    createHeader.innerHTML = 
    `<button id = "displayNavButton"><i class="fa-solid fa-bars"></i></button> 
    <p>Bienvenido, ${data.username}</p>`;
    app.append(createHeader);
    setTimeout(() => createNavMenu(data, app), 0);
};

const createNavMenu = (data, app) =>{
const header = document.querySelector('header');
const navButton = document.getElementById('displayNavButton');
    navButton.addEventListener('click', () => {
        let divNav = document.getElementById('divNav');
        if (!divNav) {
          divNav = document.createElement('div');
          divNav.id = 'divNav';
          divNav.innerHTML = `
             <nav>
                <ul>
                    <li><button id ="myAccountInfoButton">Cuenta</button></li>
                    <li class = "lis"><button id = "transactionsInfoButton">Transacciones</button></li>
                    <li class = "lis"><button id = "aboutUsInfoButton">Sobre Nosotros</button></li>
                </ul>
            </nav>
            <button id = "close-nav-button"><i class="fa-solid fa-arrow-left"></i></button>
            `;
            header.append(divNav);
    
                setTimeout(() => {
                    divNav.classList.add('show-menu');
                    console.log(divNav); 
                }, 10);
                console.log(header);     
        }

        const buttonConfig = {
            'myAccountInfoButton': 'myAccount',
            'transactionsInfoButton': 'transactions',
            'aboutUsInfoButton': 'about us'
        };

        handleEachButton(buttonConfig, data, app);

        const closeNavButton = document.getElementById('close-nav-button');
         closeNavButton.addEventListener('click', ()=>{
            divNav.classList.remove('show-menu');
            setTimeout(() => {
                divNav.remove(); 
            }, 500);
        });  
    });
}

export const handleEachButton = (selectedStage, data, app) =>{
    Object.entries(selectedStage).forEach(([buttonId, section])=>{
        document.getElementById(buttonId).addEventListener('click', ()=>AccountInfo(section, data, app));
    });
}


