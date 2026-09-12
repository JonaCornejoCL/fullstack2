// espera a que cargue el documento
document.addEventListener("DOMContentLoaded", function () {

    const datosGeograficos = {
        "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Providencia"],
        "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    };

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    for (let region in datosGeograficos) {
        let opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    }

    selectRegion.addEventListener("change", function () {
        let regionSeleccionada = this.value;

        selectComuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';

        if (regionSeleccionada !== "") {
            let comunas = datosGeograficos[regionSeleccionada];
            comunas.forEach(comuna => {
                let opcion = document.createElement("option");
                opcion.value = comuna;
                opcion.textContent = comuna;
                selectComuna.appendChild(opcion);
            });
        }
    });

    // captura el formulario
    const formulario = document.getElementById("formRegistro");

    formulario.addEventListener("submit", function (evento) {
        // previene que la página se recargue
        evento.preventDefault();

        let validacionCorrecta = true;

        // 1. valida RUN (mínimo 7 máximo 9 sin puntos ni guion)
        let runInput = document.getElementById("run").value.trim();
        let errorRun = document.getElementById("errorRun");

        // expresión regular sencilla para letras y números solamente
        let formatoRun = /^[0-9Kk]+$/;

        if (runInput.length < 7 || runInput.length > 9 || !formatoRun.test(runInput)) {
            errorRun.textContent = "El RUN debe tener entre 7 y 9 carácteres, sin puntos ni guión.";
            errorRun.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorRun.textContent = "";
        }

        // 2. valida el nombre (esto es obligatorio, máximo 50 caracteres)
        let nombreInput = document.getElementById("nombre").value.trim();
        let errorNombre = document.getElementById("errorNombre");

        if (nombreInput === "" || nombreInput.length > 50) {
            errorNombre.textContent = "El nombre es obligatorio (Máx. 50 carácteres).";
            errorNombre.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorNombre.textContent = "";
        }

        // 3. valida los apellidos (esto también es obligatorio máximo 100 carácteres)
        let apellidosInput = document.getElementById("apellidos").value.trim();
        let errorApellidos = document.getElementById("errorApellidos");

        if (apellidosInput === "" || apellidosInput.length > 100) {
            errorApellidos.textContent = "El apellido es obligatorio (Máx. 100 carácteres).";
            errorApellidos.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorApellidos.textContent = "";
        }

        // 4. valida el correo (obligatorio solo dominios permitidos segpun la rúbrica)
        let correoInput = document.getElementById("correo").value.trim();
        let errorCorreo = document.getElementById("errorCorreo");

        // verifica si termina en los dominios permitidos
        let dominioValido = correoInput.endsWith("@duoc.cl") ||
            correoInput.endsWith("@profesor.duoc.cl") ||
            correoInput.endsWith("@gmail.com");

        if (correoInput === "" || !dominioValido) {
            errorCorreo.textContent = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
            errorCorreo.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorCorreo.textContent = "";
        }

        // 5. valida la contraseña (Obligatoria, 4 a 10 caracteres)
        let passInput = document.getElementById("pass").value.trim();
        let errorPass = document.getElementById("errorPass");

        if (passInput === "" || passInput.length < 4 || passInput.length > 10) {
            errorPass.textContent = "La contraseña es obligatoria (entre 4 y 10 carácteres).";
            errorPass.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorPass.textContent = "";
        }

        // 6. valida el confirmar contraseña (debe coincidir)
        let passConfirmInput = document.getElementById("passConfirm").value.trim();
        let errorPassConfirm = document.getElementById("errorPassConfirm");

        if (passConfirmInput === "" || passConfirmInput !== passInput) {
            errorPassConfirm.textContent = "Las contraseñas no coinciden.";
            errorPassConfirm.style.color = "red";
            validacionCorrecta = false;
        } else {
            errorPassConfirm.textContent = "";
        }


        // y si todo está correcto
        if (validacionCorrecta) {
            document.getElementById("mensajeExito").style.display = "block";
            // aquí se va a agregar la base de datos 
            formulario.reset();
        }
    });
});