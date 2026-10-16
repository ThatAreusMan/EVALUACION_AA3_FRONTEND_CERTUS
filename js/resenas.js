function CrearEstrellas(Calificacion) {
    let Texto = "";
    for (let Indice = 1; Indice <= 5; Indice++) {
        if (Indice <= Calificacion) {
            Texto = Texto + "★";
        } else {
            Texto = Texto + "☆";
        }
    }
    return Texto;
}

function CrearTarjetaResena(Resena) {
    const Tarjeta = document.createElement("article");
    Tarjeta.className = "resena";

    const Estrellas = document.createElement("p");
    Estrellas.className = "estrellas";
    Estrellas.title = Resena.Calificacion + " de 5 estrellas";
    Estrellas.textContent = CrearEstrellas(Resena.Calificacion);

    const Comentario = document.createElement("p");
    Comentario.textContent = "“" + Resena.Comentario + "”";

    const Autor = document.createElement("strong");
    Autor.textContent = Resena.Autor;

    Tarjeta.appendChild(Estrellas);
    Tarjeta.appendChild(Comentario);
    Tarjeta.appendChild(Autor);
    return Tarjeta;
}

function MostrarResenas() {
    const Contenedor = document.getElementById("lista-resenas");
    Contenedor.textContent = "";
    for (let Indice = 0; Indice < ListaResenas.length; Indice++) {
        Contenedor.appendChild(CrearTarjetaResena(ListaResenas[Indice]));
    }
}

function ManejarResena(Evento) {
    Evento.preventDefault();
    OcultarMensaje("mensaje-resena");
    if (UsuarioActual === null) {
        MostrarMensaje("mensaje-resena", "Inicia sesión para dejar una reseña.", "error");
        return;
    }

    const NuevaResena = {
        Autor: UsuarioActual.Nombre,
        Calificacion: Number(document.getElementById("calificacion").value),
        Comentario: document.getElementById("comentario").value.trim()
    };
    ListaResenas.push(NuevaResena);

    document.getElementById("calificacion").value = "";
    document.getElementById("comentario").value = "";
    MostrarMensaje("mensaje-resena", "Gracias por tu reseña.", "exito");
    MostrarResenas();
}

MostrarResenas();
function OcultarMensajeResena() {
    OcultarMensaje("mensaje-resena");
}

document.getElementById("formulario-resena").addEventListener("submit", ManejarResena);
document.getElementById("formulario-resena").addEventListener("input", OcultarMensajeResena);