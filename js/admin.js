document.addEventListener("DOMContentLoaded", function () {
    
    const formNuevoProducto = document.getElementById("formNuevoProducto");

    if (formNuevoProducto) {
        formNuevoProducto.addEventListener("submit", function (evento) {
            evento.preventDefault();
            
            let validacionCorrecta = true;
            
            const mensajeProdExito = document.getElementById("mensajeProdExito");
            const alertaStock = document.getElementById("alertaStock");
            
            if (mensajeProdExito) mensajeProdExito.style.display = "none";
            if (alertaStock) alertaStock.style.display = "none";

            // 1. validación del Nombre
            let nombreProd = document.getElementById("nombreProducto").value.trim();
            let errorNombre = document.getElementById("errorNombreProd");
            if (nombreProd === "" || nombreProd.length < 3) {
                errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
                validacionCorrecta = false;
            } else {
                errorNombre.textContent = "";
            }

            // 2. validación del Precio (Mínimo 0)
            let precioProd = document.getElementById("precioProducto").value;
            let errorPrecio = document.getElementById("errorPrecioProd");
            if (precioProd === "" || isNaN(precioProd) || parseFloat(precioProd) < 0) {
                errorPrecio.textContent = "El precio es obligatorio y debe ser 0 o mayor.";
                validacionCorrecta = false;
            } else {
                errorPrecio.textContent = "";
            }

            // 3. validación de categoría
            let catProd = document.getElementById("categoriaProducto").value;
            let errorCat = document.getElementById("errorCatProd");
            if (catProd === "") {
                errorCat.textContent = "Debes seleccionar una categoría.";
                validacionCorrecta = false;
            } else {
                errorCat.textContent = "";
            }

            // 4. validación de stock y stock Crítico
            let stock = document.getElementById("stockProducto").value;
            let stockCritico = document.getElementById("stockCritico").value;
            let errorStock = document.getElementById("errorStockProd");
            let errorStockCritico = document.getElementById("errorStockCritico");
            
            let stockValido = true;

            // validar stock
            if (stock === "" || isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
                errorStock.textContent = "El stock debe ser un número entero válido.";
                validacionCorrecta = false;
                stockValido = false;
            } else {
                errorStock.textContent = "";
            }

            // validar stock crítico
            if (stockCritico === "" || isNaN(stockCritico) || !Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0) {
                errorStockCritico.textContent = "El stock crítico debe ser un número entero válido.";
                validacionCorrecta = false;
                stockValido = false;
            } else {
                errorStockCritico.textContent = "";
            }

            // si todo está correcto
            if (validacionCorrecta) {
                // alerta de regla de negocio si el stock inicial es bajo
                if (stockValido && Number(stock) <= Number(stockCritico)) {
                    if (alertaStock) alertaStock.style.display = "block";
                }
                
                if (mensajeProdExito) mensajeProdExito.style.display = "block";
                formNuevoProducto.reset();
            }
        });
    }
});