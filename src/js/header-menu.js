export const handleCreateHeader = (data, app) =>{
    console.log(app);
    const createHeader = document.createElement('header');
    createHeader.innerHTML = `<p>Bienvenido, ${data}</p>`;
    app.append(createHeader);
};
