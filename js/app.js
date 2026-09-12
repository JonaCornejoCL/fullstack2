document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
});

// 1. arreglo de productos
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

// 2. función para renderizar los productos dinámicamente
function cargarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    
    // valida que el contenedor exista en la página actual
    if (!contenedor) return;

    // reset por si acaso
    contenedor.innerHTML = ''; 

    // recorre el arreglo y crea las tarjetas
    menuTiPum.forEach(producto => {
        // aquí se crea article
        const articulo = document.createElement('article');
        articulo.classList.add('producto-card');
        
        // inyecta el contenido (imagen, nombre, precio y botón)
        articulo.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        
        contenedor.appendChild(articulo);
    });
}

// simulación de agregar al carrito
function agregarAlCarrito(id) {
    const productoSeleccionado = menuTiPum.find(p => p.id === id);
    if(productoSeleccionado) {
        alert(`¡${productoSeleccionado.nombre} añadido al carrito de Cafeta TiPum!`);
    }
}