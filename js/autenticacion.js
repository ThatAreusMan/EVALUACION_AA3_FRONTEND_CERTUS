function BuscarUsuario(Correo) {
    for (let Indice = 0; Indice < ListaUsuarios.length; Indice++) {
        if (ListaUsuarios[Indice].Correo === Correo) {
            return ListaUsuarios[Indice];
        }
    }
    return null;
}

function ManejarRegistro(Evento) {
    Evento.preventDefault();
    OcultarMensaje("mensaje-registro");
    const Nombre = document.getElementById("registro-nombre").value.trim();
    const Correo = document.getElementById("registro-correo").value.trim().toLowerCase();
    const Telefono = document.getElementById("registro-telefono").value.trim();
    const Clave = document.getElementById("registro-clave").value;
    const Confirmar = document.getElementById("registro-confirmar").value;

    if (Clave.length < 6) {
        MostrarMensaje("mensaje-registro", "La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }
    if (Clave !== Confirmar) {
        MostrarMensaje("mensaje-registro", "Las contraseñas no coinciden.", "error");
        return;
    }
    if (BuscarUsuario(Correo) !== null) {
        MostrarMensaje("mensaje-registro", "Ya existe una cuenta con ese correo.", "error");
        return;
    }

    const NuevoUsuario = {
        Id: ListaUsuarios.length + 1,
        Nombre: Nombre,
        Correo: Correo,
        Telefono: Telefono,
        Clave: Clave,
        Rol: "cliente"
    };
    ListaUsuarios.push(NuevoUsuario);

    document.getElementById("registro-nombre").value = "";
    document.getElementById("registro-correo").value = "";
    document.getElementById("registro-telefono").value = "";
    document.getElementById("registro-clave").value = "";
    document.getElementById("registro-confirmar").value = "";

    MostrarMensaje("mensaje-registro",
        "Cuenta creada para " + Nombre + ".", "exito");
}

// Obviamente los datos nunca se conservan por el cambio de pagina :v esto es pa la demo nomas - Kirivalos (Leo)

function ManejarLogin(Evento) {
    Evento.preventDefault();
    OcultarMensaje("mensaje-login");
    const Correo = document.getElementById("login-correo").value.trim().toLowerCase();
    const Clave = document.getElementById("login-clave").value;

    const UsuarioEncontrado = BuscarUsuario(Correo);
    if (UsuarioEncontrado === null || UsuarioEncontrado.Clave !== Clave) {
        MostrarMensaje("mensaje-login", "Correo o contraseña incorrectos.", "error");
        return;
    }

    window.location.href = "citas.html?id=" + UsuarioEncontrado.Id;
}

function OcultarMensajeRegistro() {
    OcultarMensaje("mensaje-registro");
}

function OcultarMensajeLogin() {
    OcultarMensaje("mensaje-login");
}

const FormularioRegistro = document.getElementById("formulario-registro");
if (FormularioRegistro !== null) {
    FormularioRegistro.addEventListener("submit", ManejarRegistro);
    FormularioRegistro.addEventListener("input", OcultarMensajeRegistro);
}

const FormularioLogin = document.getElementById("formulario-login");
if (FormularioLogin !== null) {
    FormularioLogin.addEventListener("submit", ManejarLogin);
    FormularioLogin.addEventListener("input", OcultarMensajeLogin);
}