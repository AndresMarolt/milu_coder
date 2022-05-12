document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});

async function obtenerProductos() {

    cargarLocalStorage();

    const resp = await fetch('../data.json');
    const articulosArray = await resp.json();
    
    const publicaciones = articulosArray.filter(art => {
        const {categoria} = art; 
        return categoria === localStorage.getItem('categoria');
    });

    imprimirProductos(publicaciones);
}

function cargarLocalStorage() {
    const enlacesCategorias = document.querySelectorAll('.btn-categoria')
    const enlacesTipos = document.querySelectorAll('.btn-tipo');

    enlacesCategorias.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            const categoria = e.target.innerText;
            localStorage.setItem('categoria', categoria);
        })
    })

    enlacesTipos.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            const tipo = e.target.innerText;
            localStorage.setItem('tipo', tipo)
        })
    })
}

function imprimirProductos(publicaciones) {
    const divPadre = document.getElementById('prods')

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

}
