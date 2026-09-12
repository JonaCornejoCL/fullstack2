document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
});

// 1. arreglo de productos (base de datos simulada)
const menuTiPum = [
    {
        id: 1,
        nombre: "Café Latte Pumita",
        precio: 2500,
        imagen: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        nombre: "Espresso Titi",
        precio: 1800,
        imagen: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        nombre: "Muffin de Arándanos",
        precio: 2200,
        imagen: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        nombre: "Cheesecake de Frambuesa",
        precio: 3500,
        imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80"
    }
];

// renderiza los productos en el HTML
function cargarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');

    // alida que el contenedor exista en la página actual
    if (!contenedor) return;

    // rsetea el contenedor
    contenedor.innerHTML = '';

    // recorre el arreglo y crea las tarjetas
    menuTiPum.forEach(producto => {
        const articulo = document.createElement('article');
        articulo.classList.add('producto-card');

        articulo.innerHTML = `
            <a href="detalle-producto.html" style="text-decoration: none; color: inherit;">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3 class="mt-3">${producto.nombre}</h3>
            </a>
            <p class="precio">$${producto.precio}</p>
            <button class="btn btn-primary w-100 mt-2" style="background-color: #d1321e; border-color: #d1321e;" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;

        contenedor.appendChild(articulo);
    });
}

// para añadir al LocalStorage (carrito)
function agregarAlCarrito(id) {
    const productoSeleccionado = menuTiPum.find(p => p.id === id);
    
    if (productoSeleccionado) {
        // carrito actual o crea uno vacío
        let carrito = JSON.parse(localStorage.getItem('carritoMarket')) || [];

        // verifica si el producto ya está en el carrito
        let existe = carrito.findIndex(p => p.id === id);

        if (existe !== -1) {
            // le sumamos 1 a la cantidad
            carrito[existe].cantidad += 1;
        } else {
            // agrega con cantidad 1
            carrito.push({
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.nombre,
                precio: productoSeleccionado.precio,
                imagen: productoSeleccionado.imagen,
                cantidad: 1
            });
        }

        // guarda los cambios en el navegador
        localStorage.setItem('carritoMarket', JSON.stringify(carrito));

        alert(`¡${productoSeleccionado.nombre} fue añadido al carrito exitosamente!`);
    }
}