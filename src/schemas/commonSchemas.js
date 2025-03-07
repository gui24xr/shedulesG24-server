import {z} from 'zod'

export const validatorObject = {}

validatorObject.isValidId = (field) => z.string().regex(/^[a-fA-F0-9]{24}$/, {
    message: `El ID ingresado ${field ? `en el campo ${field}` : ""} no es válido.`,
  });
  
  // Validación para DNI
  validatorObject.isValidDNI = (field) => z.string().regex(/^\d{7,8}$/).refine((val) => val[0] !== "0", {
    message: `El DNI ${field ? `en el campo ${field}` : ""} debe ser un número de 7 u 8 dígitos y no puede comenzar con 0.`,
  });
  
  // Validación para teléfono
  validatorObject.isValidPhone = (field) => z.string().regex(/^[+]?(\d{1,4})?[-\s]?\(?(\d{2,3})\)?[-\s]?\d{3}[-\s]?\d{4}$/, {
    message: `Número telefónico inválido ${field ? `en el campo ${field}` : ""}. Ejemplo: +1-234-567-8901 o 123-456-7890`,
  });
  
  // Validación para nombre
  validatorObject.isValidName = (field) => z.string().regex(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s'-]+$/, {
    message: `El nombre ${field ? `en el campo ${field}` : ""} solo puede contener letras, espacios, guiones y tildes`,
  });
  
  // Validación para UUID
  validatorObject.isValidUUID = (field) => z.string().regex(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, 
    {
      message: `El ID ${field ? `en el campo ${field}` : ""} debe ser un UUID válido`,
    }
  );
  
  // Validación para correo electrónico
  validatorObject.isValidEmail = (field) => z.string().regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    {
      message: `El correo electrónico ${field ? `en el campo ${field}` : ""} no es válido`,
    }
  );
  
  // Validación para fecha y hora
  validatorObject.isValidDateTime = (field) => z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: `La fecha y hora ${field ? `en el campo ${field}` : ""} no son válidas o no tienen el formato correcto (ej. YYYY-MM-DDTHH:MM:SS)`,
  });
  
  // Validación para fecha (solo la fecha sin hora)
  validatorObject.isValidDate = (field) => z.string().refine((val) => {
    validatorObject.date = Date.parse(val);
    return !isNaN(date) && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val);  // Formato: YYYY-MM-DD
  }, {
    message: `La fecha ${field ? `en el campo ${field}` : ""} no es válida o no tiene el formato correcto (ej. YYYY-MM-DD)`,
  });

  // Validación para hora (formato HH:MM)
validatorObject.isValidHour = (field) => z.string().refine((val) => {
    return /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(val);  // Formato: HH:MM (24 horas)
  }, {
    message: `La hora ${field ? `en el campo ${field}` : ""} no es válida o no tiene el formato correcto (ej. HH:MM)`,
  });

  validatorObject.isValidBoolean = (field) => z.boolean({
    message: `El valor ${field ? `en el campo ${field}` : ""} debe ser un valor booleano (true o false).`,
  });
  

  validatorObject.isValidLocation = (field) => z.object({
    street: z.string().nullable().default(null),
    streetNumber: z.string().nullable().default(null),
    floor: z.string().nullable().default(null),
    apartment: z.string().nullable().default(null),
    city: z.string().nullable().default(null),
    postalCode: z.string().nullable().default(null),
    state: z.string().nullable().default(null),
    country: z.string().nullable().default(null),
    latitude: z.number().nullable().default(null),
    longitude: z.number().nullable().default(null),
  }).nullable().default(null).refine(val => val !== null || val === null, {
    message: `El valor ${field ? `en el campo ${field}` : ""} debe ser una ubicación válida o null.`,
  })
  

  


