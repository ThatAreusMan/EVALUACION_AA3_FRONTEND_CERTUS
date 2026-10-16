function ObtenerDestinoServicio(IdServicio) {
    if (UsuarioActual === null) {
        return "login.html";
    }
    return "citas.html?id=" + UsuarioActual.Id + "&servicio=" + IdServicio;
}

function CrearTarjetaServicio(Servicio) {
    const Tarjeta = document.createElement("article");
    Tarjeta.className = "tarjeta";

    const Imagen = document.createElement("img");
    Imagen.src = Servicio.Imagen;
    Imagen.alt = Servicio.Nombre;

    const Titulo = document.createElement("h3");
    Titulo.textContent = Servicio.Nombre;

    const Descripcion = document.createElement("p");
    Descripcion.textContent = Servicio.Descripcion;

    const Precio = document.createElement("p");
    Precio.className = "precio";
    Precio.textContent = "Desde S/ " + Servicio.Precio;

    const Enlace = document.createElement("a");
    Enlace.href = ObtenerDestinoServicio(Servicio.Id);
    Enlace.textContent = "Solicitar servicio";

    Tarjeta.appendChild(Imagen);
    Tarjeta.appendChild(Titulo);
    Tarjeta.appendChild(Descripcion);
    Tarjeta.appendChild(Precio);
    Tarjeta.appendChild(Enlace);
    return Tarjeta;
}

function MostrarServicios() {
    const Contenedor = document.getElementById("lista-servicios");
    Contenedor.textContent = "";
    for (let Indice = 0; Indice < ListaServicios.length; Indice++) {
        Contenedor.appendChild(CrearTarjetaServicio(ListaServicios[Indice]));
    }
}

MostrarServicios();