const schedulingConfigType = [
    {
      id: 1,
      type: "SCHEDULE_PER_SERVICE",
      title: "Una agenda por servicio.",
      description: "Tenés varios servicios y cada uno funciona con una agenda independiente. Ideal para centros donde cada profesional tiene un servicio distinto.",
    },
    {
      id: 2,
      type: "SCHEDULE_SHARED_BY_PROVIDER",
      title: "Agenda compartida para todos los servicios.",
      description: "Una sola persona ofrece distintos tipos de servicios, pero todos usan la misma agenda. Es común en profesionales independientes.",
    },
    {
      id: 3,
      type: "SCHEDULE_SINGLE_SERVICE",
      title: "Una sola agenda un solo servicio.",
      description: "Solo brindás un servicio, vos mismo/a lo hacés, y necesitás una única agenda para organizar tus turnos.",
    },
    
  ];
  
  
  export default schedulingConfigType;