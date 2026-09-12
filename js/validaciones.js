document.addEventListener("DOMContentLoaded", function () {

    const datosGeograficos = {
        "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "Providencia"],
        "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    };

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    if (selectRegion && selectComuna) {
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
    }

    const formulario = document.getElementById("formRegistro");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            let validacionCorrecta = true;
            const mensajeExito = document.getElementById("mensajeExito");
            if (mensajeExito) mensajeExito.style.display = "none";

            // validacion del RUN
            let runInput = document.getElementById("run").value.trim().toUpperCase();
            let errorRun = document.getElementById("errorRun");

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
                errorRun.textContent = "El RUN ingresado no es válido (Ej: 19011022K).";
                errorRun.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorRun.textContent = "";
            }

            // validacion del nombre
            let nombreInput = document.getElementById("nombre").value.trim();
            let errorNombre = document.getElementById("errorNombre");

            if (nombreInput === "" || nombreInput.length > 50) {
                errorNombre.textContent = "El nombre es obligatorio (Máx. 50 carácteres).";
                errorNombre.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorNombre.textContent = "";
            }

            // validacion de apellidos
            let apellidosInput = document.getElementById("apellidos").value.trim();
            let errorApellidos = document.getElementById("errorApellidos");

            if (apellidosInput === "" || apellidosInput.length > 100) {
                errorApellidos.textContent = "El apellido es obligatorio (Máx. 100 carácteres).";
                errorApellidos.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorApellidos.textContent = "";
            }

            // validacion del correo
            let correoInput = document.getElementById("correo").value.trim();
            let errorCorreo = document.getElementById("errorCorreo");
            let dominioValido = correoInput.endsWith("@duoc.cl") ||
                correoInput.endsWith("@profesor.duoc.cl") ||
                correoInput.endsWith("@gmail.com");

            if (correoInput === "" || correoInput.length > 100 || !dominioValido) {
                errorCorreo.textContent = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
                errorCorreo.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorCorreo.textContent = "";
            }

            // validacion de fecha de nacimiento
            let fechaInput = document.getElementById("fechaNacimiento").value;
            let errorFecha = document.getElementById("errorFecha");

            if (fechaInput !== "") { 
                let fechaNac = new Date(fechaInput);
                let hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                let diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();

                if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }

                if (edad < 18) {
                    errorFecha.textContent = "Debes tener al menos 18 años para registrarte.";
                    errorFecha.style.color = "red";
                    validacionCorrecta = false;
                } else if (edad > 120) {
                    errorFecha.textContent = "Ingresa una fecha válida (menor a 120 años).";
                    errorFecha.style.color = "red";
                    validacionCorrecta = false;
                } else {
                    errorFecha.textContent = "";
                }
            } else {
                errorFecha.textContent = ""; 
            }

            // validacion de la región
            let regionInput = document.getElementById("region").value;
            let errorRegion = document.getElementById("errorRegion");

            if (regionInput === "") {
                errorRegion.textContent = "Por favor, selecciona una región.";
                errorRegion.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorRegion.textContent = "";
            }

            // validacion de la comuna
            let comunaInput = document.getElementById("comuna").value;
            let errorComuna = document.getElementById("errorComuna");

            if (comunaInput === "") {
                errorComuna.textContent = "Por favor, selecciona una comuna.";
                errorComuna.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorComuna.textContent = "";
            }

            // validacion de la dirección 
            let direccionInput = document.getElementById("direccion");
            if (direccionInput) {
                let direccionValor = direccionInput.value.trim();
                let errorDireccion = document.getElementById("errorDireccion");
                if (direccionValor === "" || direccionValor.length > 300) {
                    errorDireccion.textContent = "La dirección es obligatoria (Máx. 300 caracteres).";
                    errorDireccion.style.color = "red";
                    validacionCorrecta = false;
                } else {
                    errorDireccion.textContent = "";
                }
            }

            // validacion de la contraseña
            let passInput = document.getElementById("pass").value.trim();
            let errorPass = document.getElementById("errorPass");

            if (passInput === "" || passInput.length < 4 || passInput.length > 10) {
                errorPass.textContent = "La contraseña es obligatoria (entre 4 y 10 carácteres).";
                errorPass.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorPass.textContent = "";
            }

            // validacion de confirmar contraseña
            let passConfirmInput = document.getElementById("passConfirm").value.trim();
            let errorPassConfirm = document.getElementById("errorPassConfirm");

            if (passConfirmInput === "" || passConfirmInput !== passInput) {
                errorPassConfirm.textContent = "Las contraseñas no coinciden.";
                errorPassConfirm.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorPassConfirm.textContent = "";
            }

            // envío exitoso
            if (validacionCorrecta) {
                if (mensajeExito) {
                    mensajeExito.style.display = "block";
                }
                formulario.reset();
                selectComuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';
            }
        });
    }

    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function (evento) {
            evento.preventDefault();
            
            let validacionCorrecta = true;
            const mensajeLoginExito = document.getElementById("mensajeLoginExito");
            
            if (mensajeLoginExito) mensajeLoginExito.style.display = "none";

            // validacion del correo de login
            let correoLogin = document.getElementById("correoLogin").value.trim();
            let errorCorreoLogin = document.getElementById("errorCorreoLogin");
            let dominioValido = correoLogin.endsWith("@duoc.cl") || 
                                correoLogin.endsWith("@profesor.duoc.cl") || 
                                correoLogin.endsWith("@gmail.com");

            if (correoLogin === "" || correoLogin.length > 100 || !dominioValido) {
                errorCorreoLogin.textContent = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
                errorCorreoLogin.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorCorreoLogin.textContent = "";
            }

            // validacion de la contraseña de Login
            let passLogin = document.getElementById("passLogin").value.trim();
            let errorPassLogin = document.getElementById("errorPassLogin");

            if (passLogin === "" || passLogin.length < 4 || passLogin.length > 10) {
                errorPassLogin.textContent = "La contraseña es obligatoria (entre 4 y 10 caracteres).";
                errorPassLogin.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorPassLogin.textContent = "";
            }

            // envío exitoso
            if (validacionCorrecta) {
                if (mensajeLoginExito) mensajeLoginExito.style.display = "block";
                formLogin.reset();
            }
        });
    }

    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    const formContacto = document.getElementById("formContacto");

    if (formContacto) {
        formContacto.addEventListener("submit", function (evento) {
            evento.preventDefault();
            let validacionCorrecta = true;
            const mensajeContactoExito = document.getElementById("mensajeContactoExito");

            if (mensajeContactoExito) mensajeContactoExito.style.display = "none";

            // validación del nombre de contacto
            let nombreContacto = document.getElementById("nombreContacto").value.trim();
            let errorNombreContacto = document.getElementById("errorNombreContacto");
            if (nombreContacto === "" || nombreContacto.length > 100) {
                errorNombreContacto.textContent = "El nombre es obligatorio (Máx. 100 caracteres).";
                errorNombreContacto.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorNombreContacto.textContent = "";
            }

            // validación del correo de contacto
            let correoContacto = document.getElementById("correoContacto").value.trim();
            let errorCorreoContacto = document.getElementById("errorCorreoContacto");
            let dominioValido = correoContacto.endsWith("@duoc.cl") || 
                                correoContacto.endsWith("@profesor.duoc.cl") || 
                                correoContacto.endsWith("@gmail.com");

            if (correoContacto === "" || correoContacto.length > 100 || !dominioValido) {
                errorCorreoContacto.textContent = "Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
                errorCorreoContacto.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorCorreoContacto.textContent = "";
            }

            // validación del comentario
            let comentarioContacto = document.getElementById("comentarioContacto").value.trim();
            let errorComentarioContacto = document.getElementById("errorComentarioContacto");
            if (comentarioContacto === "" || comentarioContacto.length > 500) {
                errorComentarioContacto.textContent = "El mensaje es obligatorio (Máx. 500 caracteres).";
                errorComentarioContacto.style.color = "red";
                validacionCorrecta = false;
            } else {
                errorComentarioContacto.textContent = "";
            }

            // envío exitoso
            if (validacionCorrecta) {
                if (mensajeContactoExito) mensajeContactoExito.style.display = "block";
                formContacto.reset();
            }
        });
    }
});