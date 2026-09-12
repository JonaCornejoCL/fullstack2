document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
});

// 1. arreglo de productos (base de datos simulada)
const menuTiPum = [
    {
        id: 1,
        nombre: "Café Latte Pumita",
        precio: 2500,
        imagen: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80",
        descripcion: "El favorito de la casa. Un exquisito café de especialidad preparado con granos arábicos seleccionados, leche texturizada y un toque de amor inspirado en nuestro querido Pumita. Ideal para acompañar tus tardes o empezar tu mañana con energía."
    },
    {
        id: 2,
        nombre: "Espresso Titi",
        precio: 1800,
        imagen: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80",
        descripcion: "Fuerte, intenso y con mucho carácter. Nuestro Espresso Titi es un shot de pura energía extraído a la perfección. Elaborado con una mezcla especial de granos tostados en su punto exacto para resaltar sus notas achocolatadas."
    },
    {
        id: 3,
        nombre: "Muffin de Arándanos",
        precio: 2200,
        imagen: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80",
        descripcion: "Esponjoso por dentro, doradito por fuera. Horneamos nuestros muffins a diario utilizando arándanos frescos de temporada y una receta artesanal que te derretirá el corazón. El complemento perfecto para cualquier bebida caliente."
    },
    {
        id: 4,
        nombre: "Cheesecake de Frambuesa",
        precio: 3500,
        imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80",
        descripcion: "Nuestra joya de la pastelería. Una base crujiente de galleta, un relleno cremoso e irresistible de queso premium y un coulis casero de frambuesas frescas. Un postre que te hará volver a Cafeta TiPum una y otra vez."
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
            <a href="detalle-producto.html?id=${producto.id}" style="text-decoration: none; color: inherit;">
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

// función para cargar el detalle único de un producto
function cargarDetalleProducto() {
    // verifica si es la página de detalle
    const tituloDetalle = document.getElementById('detalle-nombre');
    if (!tituloDetalle) return;

    // lee el parámetro ?id= de la url
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProducto = parseInt(parametrosURL.get('id'));

    // busca el producto en el arreglo
    const producto = menuTiPum.find(p => p.id === idProducto);

    if (producto) {
        // inyecta los datos en el html
        tituloDetalle.textContent = producto.nombre;
        document.getElementById('breadcrumb-nombre').textContent = producto.nombre;
        document.getElementById('detalle-precio').textContent = `$${producto.precio}`;
        document.getElementById('detalle-imagen').src = producto.imagen;
        document.getElementById('detalle-imagen').alt = producto.nombre;

        document.getElementById('detalle-descripcion').textContent = producto.descripcion;

        // actualiza el botón para que agregue el ID correcto al carrito
        const btnAgregar = document.getElementById('btn-agregar-detalle');
        btnAgregar.setAttribute('onclick', `agregarAlCarrito(${producto.id})`);
    } else {
        tituloDetalle.textContent = "Producto no encontrado";
        document.getElementById('detalle-descripcion').textContent = "Lo sentimos, no hemos podido cargar la información de este producto.";
    }
}

// actualizamos el DOMContentLoaded para que ejecute ambas funciones según corresponda
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
    cargarDetalleProducto();
});