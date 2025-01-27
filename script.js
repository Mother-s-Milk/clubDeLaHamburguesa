let cartaController = {
    hamburguesas: [],
    solicitarHamburguesas: () => {
        fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            cartaController.hamburguesas = data.hamburguesas;
            cartaController.mostrarHamburguesas(cartaController.hamburguesas);
        })
        .catch(error => console.error('Error cargando el JSON:', error));
    },
    mostrarHamburguesas: (hamburguesas) => {
        let gridCarta = document.getElementById("grid-carta");
        gridCarta.innerHTML = '';
    
        if (hamburguesas.length === 0) {
            gridCarta.innerHTML = '<p class="text-muted">No se encontraron hamburguesas registradas</p>';
            return;
        }
    
        hamburguesas.forEach(hamburguesa => {

            let tarjetaHamburguesa = `
                <div class="tarjeta-container">
                    <div class="tarjeta-hamburguesa tarjeta-carta">
                        <div class="imagen-tarjeta">
                            <!--<span aria-label="Novedad">Novedad</span>-->
                            <img src="${hamburguesa.imgPath}" alt="${hamburguesa.nombre}" loading="lazy">
                        </div>
                        <h2>${hamburguesa.nombre}</h2>
                        <div class="info-hamburguesa">
                            <p>${hamburguesa.descripcion}</p>
                        </div>
                        <footer class="acciones-tarjeta">
                            <button type="button" class="btn-ver-mas">Ver precios</button>
                        </footer>
                    </div>
                    <div class="hamburguesa-precios">
            `;

            hamburguesa.tamanios.forEach(tamanio => {
                tarjetaHamburguesa += `
                    <div>
                        <span>${tamanio.nombre}</span>
                        <span>$${tamanio.precio}</span>
                    </div>
                `;
            });

            tarjetaHamburguesa += `
                        <button type="button" class="btn-ver-menos">Ver menos</button>
                    </div>
                </div>
            `;

            gridCarta.insertAdjacentHTML('beforeend', tarjetaHamburguesa);
        });

        const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
        const botonesVerMenos = document.querySelectorAll('.btn-ver-menos');
    
        const mostrarDescripcion = (boton) => {
            const tarjeta = boton.closest('.tarjeta-container');
            const descripcion = tarjeta.querySelector('.hamburguesa-precios');
            descripcion.classList.add('mostrar-descripcion');
        };
    
        const ocultarDescripcion = (boton) => {
            const tarjeta = boton.closest('.tarjeta-container');
            const descripcion = tarjeta.querySelector('.hamburguesa-precios');
            descripcion.classList.remove('mostrar-descripcion');
        };
    
        botonesVerMas.forEach((boton) => {
            boton.addEventListener('click', () => {
                mostrarDescripcion(boton);
            });
        });
    
        botonesVerMenos.forEach((boton) => {
            boton.addEventListener('click', () => {
                ocultarDescripcion(boton);
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cartaController.solicitarHamburguesas();

    document.getElementById("btn-menu-desplegable").addEventListener("click", () => {
        const navMenu = document.getElementById("nav-menu");
        const iconoMenu = document.getElementById("icono-menu");
    
        navMenu.classList.toggle("active");
    
        if (navMenu.classList.contains("active")) {
            iconoMenu.classList.remove("fa-bars");
            iconoMenu.classList.add("fa-times");
        } else {
            iconoMenu.classList.remove("fa-times");
            iconoMenu.classList.add("fa-bars");
        }
    });
    
    const enlacesMenu = document.querySelectorAll(".nav-menu ul li a");
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener("click", () => {
            const navMenu = document.getElementById("nav-menu");
            const iconoMenu = document.getElementById("icono-menu");

            navMenu.classList.remove("active");
            iconoMenu.classList.remove("fa-times");
            iconoMenu.classList.add("fa-bars");
        });
    });

    window.addEventListener("load", () => {
        const preloader = document.querySelector(".preloader");
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 1200);
    });
});