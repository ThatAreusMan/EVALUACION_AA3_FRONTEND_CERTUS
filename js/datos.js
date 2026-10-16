
const ListaUsuarios = [
    {
        Id: 1,
        Nombre: "John Donovan",
        Correo: "root1@gmail.com",
        Telefono: "987654321",
        Clave: "root123",
        Rol: "cliente"
    },
    {
        Id: 2,
        Nombre: "Jane Donovan",
        Correo: "root2@outlook.com",
        Telefono: "912345678",
        Clave: "root123",
        Rol: "cliente"
    }
];

const ListaServicios = [
    {
        Id: 1,
        Nombre: "Cambio de aceite",
        Descripcion: "Cambio de aceite, filtros y revisión de niveles.",
        Precio: 120,
        Imagen: "../images/cambio_aceite_prod1.jpeg"
    },
    {
        Id: 2,
        Nombre: "Mecánica general",
        Descripcion: "Revisión y reparación de los principales sistemas del vehículo.",
        Precio: 150,
        Imagen: "../images/mecanica_general_prod2.jpg"
    },
    {
        Id: 3,
        Nombre: "Frenos y suspensión",
        Descripcion: "Chequeo de frenos, amortiguadores, dirección y neumáticos.",
        Precio: 180,
        Imagen: "../images/frenos_suspension_prod3.jpg"
    },
    {
        Id: 4,
        Nombre: "Diagnóstico electrónico",
        Descripcion: "Escaneo electrónico para detectar fallas y códigos de error.",
        Precio: 90,
        Imagen: "../images/diagnostico_electronico_prod4.jpg"
    }
];

const ListaCitas = [
    {
        Id: 1,
        IdUsuario: 1,
        Servicio: "Cambio de aceite",
        Marca: "Toyota",
        Modelo: "Yaris",
        Placa: "ABC-123",
        Fecha: "2026-10-28",
        Hora: "10:00",
        Estado: "Pendiente"
    },
    {
        Id: 2,
        IdUsuario: 1,
        Servicio: "Frenos y suspensión",
        Marca: "Toyota",
        Modelo: "Yaris",
        Placa: "ABC-123",
        Fecha: "2026-10-20",
        Hora: "15:00",
        Estado: "Cancelada"
    },
    {
        Id: 3,
        IdUsuario: 2,
        Servicio: "Diagnóstico electrónico",
        Marca: "Hyundai",
        Modelo: "Tucson",
        Placa: "XYZ-789",
        Fecha: "2026-10-30",
        Hora: "09:00",
        Estado: "Pendiente"
    }
];

const ListaResenas = [
    {
        Autor: "Laura Gómez",
        Calificacion: 5,
        Comentario: "Buena atención y me explicaron claramente qué reparación necesitaba mi vehículo."
    },
    {
        Autor: "Carlos Ramírez",
        Calificacion: 5,
        Comentario: "El mantenimiento fue rápido y el auto quedó funcionando muy bien."
    },
    {
        Autor: "Andrea Torres",
        Calificacion: 4,
        Comentario: "Buena comunicación y precios claros antes de iniciar el trabajo."
    }
];
