const ListaHoras = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
let ContadorCitas = ListaCitas.length;

function LlenarServicios() {
    const Select = document.getElementById("servicio");
    for (let Indice = 0; Indice < ListaServicios.length; Indice++) {
        const Opcion = document.createElement("option");
        Opcion.value = ListaServicios[Indice].Nombre;
        Opcion.textContent = ListaServicios[Indice].Nombre;
        Select.appendChild(Opcion);
    }
}

function LlenarHoras() {
    const Select = document.getElementById("hora");
    for (let Indice = 0; Indice < ListaHoras.length; Indice++) {
        const Opcion = document.createElement("option");
        Opcion.value = ListaHoras[Indice];
        Opcion.textContent = ListaHoras[Indice];
        Select.appendChild(Opcion);
    }
}

function FormatearFecha(Fecha) {
    const Partes = Fecha.split("-");
    return Partes[2] + "/" + Partes[1] + "/" + Partes[0];
}

function HorarioOcupado(Fecha, Hora) {
    for (let Indice = 0; Indice < ListaCitas.length; Indice++) {
        const Cita = ListaCitas[Indice];
        if (Cita.Estado === "Pendiente" && Cita.Fecha === Fecha && Cita.Hora === Hora) {
            return true;
        }
    }
    return false;
}

function ManejarCita(Evento) {
    Evento.preventDefault();
    OcultarMensaje("mensaje-cita");
    const Servicio = document.getElementById("servicio").value;
    const Marca = document.getElementById("marca").value.trim();
    const Modelo = document.getElementById("modelo").value.trim();
    const Placa = document.getElementById("placa").value.trim().toUpperCase();
    const Fecha = document.getElementById("fecha").value;
    const Hora = document.getElementById("hora").value;

    if (HorarioOcupado(Fecha, Hora)) {
        MostrarMensaje("mensaje-cita", "Ese horario ya está reservado. Elige otra fecha u hora.", "error");
        return;
    }

    ContadorCitas = ContadorCitas + 1;
    const NuevaCita = {
        Id: ContadorCitas,
        IdUsuario: UsuarioActual.Id,
        Servicio: Servicio,
        Marca: Marca,
        Modelo: Modelo,
        Placa: Placa,
        Fecha: Fecha,
        Hora: Hora,
        Estado: "Pendiente"
    };
    ListaCitas.push(NuevaCita);

    document.getElementById("servicio").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("placa").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";

    MostrarMensaje("mensaje-cita", "Cita registrada para el " + FormatearFecha(Fecha) + " a las " + Hora + ".", "exito");
    MostrarMisCitas();
}

function CancelarCita(IdCita) {
    OcultarMensaje("mensaje-cita");
    for (let Indice = 0; Indice < ListaCitas.length; Indice++) {
        if (ListaCitas[Indice].Id === IdCita) {
            ListaCitas[Indice].Estado = "Cancelada";
        }
    }
    MostrarMisCitas();
}

function CrearTarjetaCita(Cita) {
    const Tarjeta = document.createElement("article");
    Tarjeta.className = "cita cita-" + Cita.Estado.toLowerCase();

    const Titulo = document.createElement("h3");
    Titulo.textContent = Cita.Servicio;

    const Vehiculo = document.createElement("p");
    Vehiculo.textContent = "Vehículo: " + Cita.Marca + " " + Cita.Modelo + " (" + Cita.Placa + ")";

    const Horario = document.createElement("p");
    Horario.textContent = "Fecha: " + FormatearFecha(Cita.Fecha) + " · " + Cita.Hora;

    const Estado = document.createElement("p");
    Estado.className = "estado";
    Estado.textContent = Cita.Estado;

    Tarjeta.appendChild(Titulo);
    Tarjeta.appendChild(Vehiculo);
    Tarjeta.appendChild(Horario);
    Tarjeta.appendChild(Estado);

    if (Cita.Estado === "Pendiente") {
        const BotonCancelar = document.createElement("button");
        BotonCancelar.type = "button";
        BotonCancelar.className = "boton-cancelar";
        BotonCancelar.textContent = "Cancelar cita";
        BotonCancelar.addEventListener("click", function () {
            CancelarCita(Cita.Id);
        });
        Tarjeta.appendChild(BotonCancelar);
    }
    return Tarjeta;
}

function MostrarMisCitas() {
    const Contenedor = document.getElementById("lista-citas");
    Contenedor.textContent = "";
    if (UsuarioActual === null) {
        return;
    }

    document.getElementById("datos-cliente").textContent =
        "Cliente: " + UsuarioActual.Nombre + " · " + UsuarioActual.Correo + " · " + UsuarioActual.Telefono;

    let Cantidad = 0;
    for (let Indice = 0; Indice < ListaCitas.length; Indice++) {
        if (ListaCitas[Indice].IdUsuario === UsuarioActual.Id) {
            Contenedor.appendChild(CrearTarjetaCita(ListaCitas[Indice]));
            Cantidad = Cantidad + 1;
        }
    }
    document.getElementById("sin-citas").hidden = Cantidad > 0;
}

function MostrarPaginaCitas() {
    const HaySesion = UsuarioActual !== null;
    document.getElementById("sin-sesion").hidden = HaySesion;
    document.getElementById("cita").hidden = !HaySesion;
    document.getElementById("mis-citas").hidden = !HaySesion;
}

function SeleccionarServicioInicial() {
    const IdServicio = Number(ObtenerParametro("servicio"));
    for (let Indice = 0; Indice < ListaServicios.length; Indice++) {
        if (ListaServicios[Indice].Id === IdServicio) {
            document.getElementById("servicio").value = ListaServicios[Indice].Nombre;
        }
    }
}

document.getElementById("fecha").min = new Date().toLocaleDateString("en-CA");

LlenarServicios();
LlenarHoras();
SeleccionarServicioInicial();
MostrarPaginaCitas();
MostrarMisCitas();
function OcultarMensajeCita() {
    OcultarMensaje("mensaje-cita");
}

document.getElementById("formulario-cita").addEventListener("submit", ManejarCita);
document.getElementById("formulario-cita").addEventListener("input", OcultarMensajeCita);