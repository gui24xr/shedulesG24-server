const establishmentStatus = [
    {
        status: "pendingData",
        title: "Datos Pendientes",
        description: "El establecimiento se ha creado pero falta información básica para comenzar a operar.",
        color: "#FFA500", // Naranja
        icon: "pending",
        warningMessage: "Complete los datos pendientes para activar su establecimiento. Es necesario completar datos de telefono, direccion y email donde seras contactado..."
    },
    {
        status: "trial",
        title: "Período de Prueba",
        description: "El establecimiento está en período de prueba gratuito",
        color: "#2196F3", // Verde
        icon: "trial",
        warningMessage: "Su período de prueba finaliza en X días. Actualice su plan para continuar."
    },
    {
        status: "active",
        title: "Activo",
        description: "El establecimiento está activo y al día con los pagos.",
        color: "#4CAF50", // Azul
        icon: "active",
        warningMessage: null
    },
    {
        status: "paymentPending",
        title: "Pago Pendiente",
        description: "El pago está vencido pero aún en período de gracia.",
        color: "#FFC107", // Amarillo
        icon: "payment",
        warningMessage: "Su pago está pendiente. Regularice su situación para evitar la suspensión del servicio."
    },
    {
        status: "suspended",
        title: "Suspendido",
        description: "El servicio está suspendido por falta de pago.",
        color: "#F44336", // Rojo
        icon: "suspended",
        warningMessage: "Su servicio está suspendido por falta de pago. Regularice su situación para reactivar."
    },
    {
        status: "inactive",
        title: "Inactivo",
        description: "El establecimiento ha decidido pausar su cuenta.",
        color: "#9E9E9E", // Gris
        icon: "inactive",
        warningMessage: "Su cuenta está inactiva. Reactívela cuando desee volver a usar nuestros servicios."
    },
    {
        status: "cancelled",
        title: "Cancelado",
        description: "La cuenta ha sido cancelada definitivamente.",
        color: "#000000", // Negro
        icon: "cancelled",
        warningMessage: "Su cuenta ha sido cancelada. Contacte a soporte si desea reactivarla."
    }
];

export default establishmentStatus; 