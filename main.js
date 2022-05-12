document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});


async function obtenerProductos() {
    cargarLocalStorage();

    const resp = await fetch('../data.json');
    const articulosArray = await resp.json();
    
    const publicaciones = articulosArray.filter(art => {
        const {categoria, tipo} = art;
        return (categoria === localStorage.getItem('categoria') && tipo === localStorage.getItem('tipo'));
    });

    console.log(publicaciones);
    imprimirProductos(publicaciones);
}

function cargarLocalStorage() {
    const enlacesTipos = document.querySelectorAll('.enlace-producto');

    enlacesTipos.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            const tipo = e.target.innerText;
            const categoria = e.target.parentElement.parentElement.previousElementSibling.innerText;
            console.log(tipo);
            console.log(categoria);
            localStorage.setItem('tipo', tipo);
            localStorage.setItem('categoria', categoria);
        })
    })
}

function imprimirProductos(publicaciones) {
    const divPadre = document.getElementById('prods')

    if(publicaciones.length > 0) {
        publicaciones.forEach((publicacion) => {
            const nuevoElemento = document.createElement("DIV");
            const {nombre, precio, imagen} = publicacion;
    
            nuevoElemento.setAttribute("class", "producto");
    
            nuevoElemento.innerHTML = `
                <img src=${imagen} alt="" class="w-100 img-producto">
                <p class="mb-0">${nombre}</p>
                <p>$${precio}</p>
            `;
            
            divPadre.appendChild(nuevoElemento);
        })
    
        console.log(publicaciones);
    } else {
        const nuevoElemento = document.createElement("H1");
        nuevoElemento.setAttribute("style", "grid-column: 1 / 5")

        nuevoElemento.innerText = "No se encontraron resultados en esta categoría."

        divPadre.appendChild(nuevoElemento)
    }

}
