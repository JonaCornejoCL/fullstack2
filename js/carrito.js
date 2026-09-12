document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

function cargarCarrito() {
    const tablaCarrito = document.getElementById("tabla-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    
    // obtiene los datos guardados en el navegador
    let carrito = JSON.parse(localStorage.getItem('carritoMarket')) || [];
    
    tablaCarrito.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        tablaCarrito.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">Tu carrito está vacío.</td></tr>`;
        totalCarrito.textContent = "$0";
        return;
    }

    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        sumaTotal += subtotal;

        const fila = document.tr; // corrección para crear elementos de tabla
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-3">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                    <span>${producto.nombre}</span>
                </div>
            </td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        
        tablaCarrito.appendChild(tr);
    });

    totalCarrito.textContent = `$${sumaTotal}`;
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carritoMarket')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carritoMarket', JSON.stringify(carrito));
    cargarCarrito();
}

function finalizarCompra() {
    let carrito = JSON.parse(localStorage.getItem('carritoMarket')) || [];
    if (carrito.length === 0) {
        alert("No hay productos en el carrito para comprar.");
        return;
    }
    alert("¡Compra realizada con éxito en Cafeta TiPum! Gracias por preferirnos.");
    localStorage.removeItem('carritoMarket');
    cargarCarrito();
}