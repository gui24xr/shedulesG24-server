const schedulingConfigType = [
  {
    id: 1,
    type: "SCHEDULE_PER_SERVICE",
    title: "Una agenda por servicio",
    description: "Cada servicio tiene una agenda independiente. Ideal para centros o negocios donde se desea gestionar la disponibilidad de cada servicio por separado."
  },
  {
    id: 2,
    type: "SCHEDULE_SHARED_BY_ALL",
    title: "Una sola agenda para todos los servicios",
    description: "Todos los servicios usan una única agenda. Es útil cuando una misma persona brinda múltiples servicios y necesita centralizar sus horarios."
  },
  {
    id: 3,
    type: "SCHEDULE_SHARED_BY_GROUP",
    title: "Agenda compartida por grupos de servicios",
    description: "Se definen grupos de servicios que comparten una misma agenda. Es útil para organizar equipos o áreas con servicios relacionados."
  }
];

export default schedulingConfigType;

