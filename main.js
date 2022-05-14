document.addEventListener("DOMContentLoaded", () => {
    obtenerProductos();
});

async function obtenerProductos() {
    cargarLocalStorage();

    const resp = await fetch("../data.json");
    const articulosArray = await resp.json();

    const publicaciones = articulosArray.filter((art) => {
        const {
            categoria,
            tipo
        } = art;
        return (
            categoria === localStorage.getItem("categoria") &&
            tipo === localStorage.getItem("tipo")
        );
    });

    console.log(publicaciones);
    imprimirProductos(publicaciones);
}

function cargarLocalStorage() {
    const enlacesTipos = document.querySelectorAll(".enlace-producto");

    enlacesTipos.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            const tipo = e.target.innerText;
            const categoria =
                e.target.parentElement.parentElement.previousElementSibling.innerText;
            console.log(tipo);
            console.log(categoria);
            localStorage.setItem("tipo", tipo);
            localStorage.setItem("categoria", categoria);
        });
    });
}

function imprimirProductos(publicaciones) {
    const divPadre = document.getElementById("prods");

    if (publicaciones.length > 0) {
        publicaciones.forEach((publicacion) => {
            const nuevoElemento = document.createElement("DIV");
            const {
                nombre,
                precio,
                imagen, 
                talles
            } = publicacion;

            nuevoElemento.setAttribute("class", "producto");

            nuevoElemento.innerHTML = `
                <img src=${imagen} alt="" class="w-100 img-producto">
                <p class="mb-0">${nombre}</p>
                <p>$${precio}</p>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Ver info del producto
                </button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${nombre}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="parentProduct">
                        <div class="div-1"> 
                            <img src=${imagen} alt="" height="250">
                        </div>
                        <div class="div-2"> 
                            <h1>Nombre producto</h1>
                            <h4>$${precio}</h4>
                        </div>
                        <div class="div-3"> 
                            <h4>TALLE:</h4>
                            <div class="buttons">
                                <button>2</button>
                                <button>4</button>
                                <button>6</button>
                                <button>8</button>
                                <button>10</button>
                            </div>
                        </div>
                        <div class="div-4"> 
                            <h4>COLOR:</h4>
                        </div>
                        <div class="div-5"> 
                        <p>Si querés mas información sobre este producto hacé click <a href="https://wa.me/5491138940402" target="_blank">acá</a></p>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                    
                </div>
                </div>
                
            `;

            divPadre.appendChild(nuevoElemento);
        });

        console.log(publicaciones);
    } else {
        const nuevoElemento = document.createElement("H1");
        nuevoElemento.setAttribute("style", "grid-column: 1 / 5");

        nuevoElemento.innerText = "No se encontraron resultados en esta categoría.";

        divPadre.appendChild(nuevoElemento);
    }
}