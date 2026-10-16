let MenuAbierto = false;
let UsuarioActual = null;

function MostrarMensaje(IdMensaje, Texto, Tipo) {
    const Mensaje = document.getElementById(IdMensaje);
    Mensaje.textContent = Texto;
    Mensaje.className = "mensaje mensaje-" + Tipo;
    Mensaje.hidden = false;
}

function OcultarMensaje(IdMensaje) {
    document.getElementById(IdMensaje).hidden = true;
}

function ObtenerParametro(Nombre) {
    const Texto = window.location.search.replace("?", "");
    const ListaPares = Texto.split("&");
    for (let Indice = 0; Indice < ListaPares.length; Indice++) {
        const Par = ListaPares[Indice].split("=");
        if (Par[0] === Nombre) {
            return Par[1];
        }
    }
    return "";
}

function BuscarUsuarioPorId(IdUsuario) {
    for (let Indice = 0; Indice < ListaUsuarios.length; Indice++) {
        if (ListaUsuarios[Indice].Id === IdUsuario) {
            return ListaUsuarios[Indice];
        }
    }
    return null;
}

function CargarSesion() {
    UsuarioActual = BuscarUsuarioPorId(Number(ObtenerParametro("id")));
}

function ObtenerSufijoSesion() {
    if (UsuarioActual === null) {
        return "";
    }
    return "?id=" + UsuarioActual.Id;
}

const ListaEnlaces = [
    { Id: "logo-enlace", Destino: "index.html", Ancla: "#inicio" },
    { Id: "enlace-inicio", Destino: "index.html", Ancla: "#inicio" },
    { Id: "enlace-nosotros", Destino: "index.html", Ancla: "#nosotros" },
    { Id: "enlace-servicios", Destino: "index.html", Ancla: "#servicios" },
    { Id: "enlace-resenas", Destino: "index.html", Ancla: "#resenas" },
    { Id: "enlace-dejar-resena", Destino: "index.html", Ancla: "#dejar-resena" },
    { Id: "enlace-contacto", Destino: "index.html", Ancla: "#contacto" },
    { Id: "enlace-citas", Destino: "citas.html", Ancla: "" },
    { Id: "enlace-agendar-menu", Destino: "citas.html", Ancla: "" }
];

function ActualizarEnlaces() {
    const Sufijo = ObtenerSufijoSesion();
    for (let Indice = 0; Indice < ListaEnlaces.length; Indice++) {
        const Item = ListaEnlaces[Indice];
        document.getElementById(Item.Id).href = Item.Destino + Sufijo + Item.Ancla;
    }

    const EnlaceHero = document.getElementById("enlace-agendar-hero");
    if (EnlaceHero !== null) {
        EnlaceHero.href = "citas.html" + Sufijo;
    }
}

function ActualizarMenuSesion() {
    const HaySesion = UsuarioActual !== null;
    document.getElementById("enlace-ingresar").hidden = HaySesion;
    document.getElementById("enlace-registro").hidden = HaySesion;
    document.getElementById("enlace-citas").hidden = !HaySesion;
    document.getElementById("saludo").hidden = !HaySesion;
    document.getElementById("boton-salir").hidden = !HaySesion;

    if (HaySesion) {
        const PrimerNombre = UsuarioActual.Nombre.split(" ")[0];
        document.getElementById("saludo").textContent = "Hola, " + PrimerNombre;
    }
}

function CerrarSesion() {
    window.location.href = "index.html";
}

function AbrirMenu() {
    document.getElementById("menu").className = "menu abierto";
    document.getElementById("boton-menu").textContent = "Cerrar";
    MenuAbierto = true;
}

function CerrarMenu() {
    document.getElementById("menu").className = "menu";
    document.getElementById("boton-menu").textContent = "Menú";
    MenuAbierto = false;
}

function AlternarMenu() {
    if (MenuAbierto) {
        CerrarMenu();
    } else {
        AbrirMenu();
    }
}

const IdsEnlacesMenu = [
    "enlace-inicio",
    "enlace-nosotros",
    "enlace-servicios",
    "enlace-resenas",
    "enlace-dejar-resena",
    "enlace-contacto",
    "enlace-ingresar",
    "enlace-registro",
    "enlace-citas"
];

function MarcarActivo(IdActivo) {
    for (let Indice = 0; Indice < IdsEnlacesMenu.length; Indice++) {
        document.getElementById(IdsEnlacesMenu[Indice]).className = "";
    }
    document.getElementById(IdActivo).className = "activo";
}

function ActivarEnlaceActual() {
    if (document.getElementById("formulario-login") !== null) {
        MarcarActivo("enlace-ingresar");
        return;
    }
    if (document.getElementById("formulario-registro") !== null) {
        MarcarActivo("enlace-registro");
        return;
    }
    if (document.getElementById("formulario-cita") !== null) {
        MarcarActivo("enlace-citas");
        return;
    }

    const Hash = window.location.hash;
    let IdActivo = "";
    if (Hash === "") {
        IdActivo = "enlace-inicio";
    }
    for (let Indice = 0; Indice < ListaEnlaces.length; Indice++) {
        const Item = ListaEnlaces[Indice];
        if (Item.Destino === "index.html" && Item.Ancla === Hash && Item.Id !== "logo-enlace") {
            IdActivo = Item.Id;
        }
    }
    if (IdActivo !== "") {
        MarcarActivo(IdActivo);
    }
}

document.getElementById("boton-menu").addEventListener("click", AlternarMenu);
document.getElementById("menu").addEventListener("click", CerrarMenu);
document.getElementById("boton-salir").addEventListener("click", CerrarSesion);

CargarSesion();
ActualizarEnlaces();
ActualizarMenuSesion();
ActivarEnlaceActual();
window.addEventListener("hashchange", ActivarEnlaceActual);