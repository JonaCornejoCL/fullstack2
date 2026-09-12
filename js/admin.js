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

    // VALIDACIÓN: NUEVO USUARIO (ADMINISTRADOR)
    const formAdminUsuario = document.getElementById("formAdminUsuario");

    if (formAdminUsuario) {
        formAdminUsuario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            let validacionCorrecta = true;
            const mensajeUserExito = document.getElementById("mensajeUserExito");
            if (mensajeUserExito) mensajeUserExito.style.display = "none";

            // 1. valida el RUN
            let runInput = document.getElementById("adminRun").value.trim().toUpperCase();
            let errorRun = document.getElementById("errorAdminRun");

            function validaRutChileno(rut) {
                if (!/^[0-9]+[0-9K]$/.test(rut)) return false;
                let cuerpo = rut.slice(0, -1);
                let dv = rut.slice(-1);
                let suma = 0;
                let multiplo = 2;
                for (let i = 1; i <= cuerpo.length; i++) {
                    let index = multiplo * rut.charAt(cuerpo.length - i);
                    suma = suma + index;
                    multiplo = multiplo < 7 ? multiplo + 1 : 2;
                }
                let dvEsperado = 11 - (suma % 11);
                dvEsperado = (dvEsperado === 11) ? 0 : (dvEsperado === 10) ? "K" : dvEsperado.toString();
                return dvEsperado === dv;
            }

            if (runInput.length < 7 || runInput.length > 9 || !validaRutChileno(runInput)) {
                errorRun.textContent = "RUN inválido (Ej: 19011022K).";
                validacionCorrecta = false;
            } else {
                errorRun.textContent = "";
            }

            // 2. valida el nombre y apellidos
            let nombre = document.getElementById("adminNombre").value.trim();
            if (nombre === "" || nombre.length > 50) {
                document.getElementById("errorAdminNombre").textContent = "Obligatorio (Máx. 50).";
                validacionCorrecta = false;
            } else {
                document.getElementById("errorAdminNombre").textContent = "";
            }

            let apellidos = document.getElementById("adminApellidos").value.trim();
            if (apellidos === "" || apellidos.length > 100) {
                document.getElementById("errorAdminApellidos").textContent = "Obligatorio (Máx. 100).";
                validacionCorrecta = false;
            } else {
                document.getElementById("errorAdminApellidos").textContent = "";
            }

            // 3. valida el correo
            let correo = document.getElementById("adminCorreo").value.trim();
            let errorCorreo = document.getElementById("errorAdminCorreo");
            let dominioValido = correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com");

            if (correo === "" || correo.length > 100 || !dominioValido) {
                errorCorreo.textContent = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
                validacionCorrecta = false;
            } else {
                errorCorreo.textContent = "";
            }

            // 4. valida el rol
            let rol = document.getElementById("adminRol").value;
            if (rol === "") {
                document.getElementById("errorAdminRol").textContent = "Debes asignar un rol.";
                validacionCorrecta = false;
            } else {
                document.getElementById("errorAdminRol").textContent = "";
            }

            // 5. valida las contraseñas
            let pass = document.getElementById("adminPass").value.trim();
            let passConfirm = document.getElementById("adminPassConfirm").value.trim();
            
            if (pass === "" || pass.length < 4 || pass.length > 10) {
                document.getElementById("errorAdminPass").textContent = "Obligatoria (4 a 10 caracteres).";
                validacionCorrecta = false;
            } else {
                document.getElementById("errorAdminPass").textContent = "";
            }

            if (passConfirm === "" || passConfirm !== pass) {
                document.getElementById("errorAdminPassConfirm").textContent = "Las contraseñas no coinciden.";
                validacionCorrecta = false;
            } else {
                document.getElementById("errorAdminPassConfirm").textContent = "";
            }

            if (validacionCorrecta) {
                if (mensajeUserExito) mensajeUserExito.style.display = "block";
                formAdminUsuario.reset();
            }
        });
    }
});