
export const handleCreateHeader = (data, app) =>{
    console.log(app);
    const createHeader = document.createElement('header');
    createHeader.id = 'main-header';
    createHeader.innerHTML = 
    `<button id = "displayNavButton"><i class="fa-solid fa-bars"></i></button> 
    <p>Bienvenido, ${data}</p>`;
    app.append(createHeader);
    setTimeout(() => createNavMenu(), 0);
};

const createNavMenu = () =>{
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
                            <li><button>Cuenta</button></li>
                            <li class = "lis"><button>Transacciones</button></li>
                            <li class = "lis"><button>Sobre Nosotros</button></li>
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
            const closeNavButton = document.getElementById('close-nav-button');
            closeNavButton.addEventListener('click', ()=>{
                divNav.classList.remove('show-menu');
                divNav.classList.add('remove-menu');
                setTimeout(() => {
                    divNav.remove(); 
                }, 500);
            });
         });
}


