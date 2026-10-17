document.addEventListener("DOMContentLoaded", function () {
    const usuariosBase = [
        { run: "19011022K", nombre: "Juan Pérez", correo: "juan.perez@duoc.cl", comuna: "Santiago", rol: "Cliente" },
        { run: "182345678", nombre: "María González", correo: "m.gonzalez@gmail.com", comuna: "Viña del Mar", rol: "Cliente" },
        { run: "159876543", nombre: "Admin Master", correo: "admin@duoc.cl", comuna: "Providencia", rol: "Administrador" }
    ];

    if (!localStorage.getItem("usuariosTipum")) {
        localStorage.setItem("usuariosTipum", JSON.stringify(usuariosBase));
    }

    renderizarUsuarios();

    const form = document.getElementById("formAdminUsuario");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            guardarUsuario();
        });
    }
});

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuariosTipum")) || [];
}

function renderizarUsuarios() {
    const tabla = document.getElementById("tablaUsuarios");
    if (!tabla) return;

    const usuarios = obtenerUsuarios();
    tabla.innerHTML = "";

    usuarios.forEach((user, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.run}</td>
            <td>${user.nombre}</td>
            <td>${user.correo}</td>
            <td>${user.comuna}</td>
            <td><span class="badge ${user.rol === 'Administrador' ? 'bg-danger' : 'bg-primary'}">${user.rol}</span></td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm me-1" onclick="editarUsuario(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

function guardarUsuario() {
    const usuarios = obtenerUsuarios();
    const index = document.getElementById("usuarioIndex").value;

    const nuevoUsuario = {
        run: document.getElementById("adminRun").value,
        nombre: document.getElementById("adminNombre").value,
        correo: document.getElementById("adminCorreo").value,
        comuna: document.getElementById("adminComuna").value,
        rol: document.getElementById("adminRol").value
    };

    if (index === "") {
        usuarios.push(nuevoUsuario);
    } else {
        usuarios[index] = nuevoUsuario;
    }

    localStorage.setItem("usuariosTipum", JSON.stringify(usuarios));
    renderizarUsuarios();

    const modalEl = document.getElementById("modalUsuario");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

function editarUsuario(index) {
    const usuarios = obtenerUsuarios();
    const user = usuarios[index];

    document.getElementById("usuarioIndex").value = index;
    document.getElementById("adminRun").value = user.run;
    document.getElementById("adminNombre").value = user.nombre;
    document.getElementById("adminCorreo").value = user.correo;
    document.getElementById("adminComuna").value = user.comuna;
    document.getElementById("adminRol").value = user.rol;

    document.getElementById("tituloModal").textContent = "Editar Usuario";

    const modal = new bootstrap.Modal(document.getElementById("modalUsuario"));
    modal.show();
}

function eliminarUsuario(index) {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        const usuarios = obtenerUsuarios();
        usuarios.splice(index, 1);
        localStorage.setItem("usuariosTipum", JSON.stringify(usuarios));
        renderizarUsuarios();
    }
}

function limpiarFormulario() {
    document.getElementById("formAdminUsuario").reset();
    document.getElementById("usuarioIndex").value = "";
    document.getElementById("tituloModal").textContent = "Agregar Usuario";
}