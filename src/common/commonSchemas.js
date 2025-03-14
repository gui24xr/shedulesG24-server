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
  

  validatorObject.isValidImageURL = (field) => z
  .string()
  .url()
  .regex(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
    message: `La URL ${field ? `en el campo ${field}` : ""} debe ser una URL válida y debe apuntar a una imagen con extensión .jpg, .jpeg, .png, .gif, .bmp o .webp.`,
  });
  


validatorObject.isArrayOfValidIdOrEmptyArray = (field) => z.array(validatorObject.isValidId(field))
  .refine(ids => ids.length === 0 || ids.every(id => /^[a-fA-F0-9]{24}$/.test(id)), {
    message: `El campo ${field ? `en el campo ${field}` : ""} debe ser un array vacío o contener solo IDs válidos.`,
  });




validatorObject.isValidUserName = (field) =>
  z.string().regex(/^[a-zA-Z0-9_.-]{3,20}$/, {
    message: `El nombre de usuario ${field ? `en el campo ${field}` : ""} debe tener entre 3 y 20 caracteres y solo puede contener letras, números, guiones bajos (_), puntos (.) y guiones (-).`,
  });


  validatorObject.isValidPassword = (field) =>
    z.string().min(8).max(64).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,64}$/, {
      message: `La contraseña ${field ? `en el campo ${field}` : ""} debe tener entre 8 y 64 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial.`,
    });


    validatorObject.isValidEnum = (field, enumList) =>
      z.string().refine((val) => enumList.includes(val), {
        message: `El valor ${field ? `en el campo ${field}` : ""} no es válido. Debe ser uno de: ${enumList.join(", ")}.`,
      });


      validatorObject.isArrayOfValidObjects = (field, objectSchema) =>
        z.array(objectSchema).refine(
          (items) => items.length === 0 || items.every((item) => objectSchema.safeParse(item).success),
          {
            message: `El campo ${field ? `en el campo ${field}` : ""} debe ser un array vacío o contener solo objetos válidos con la estructura correcta.`,
          }
        );

        validatorObject.isArrayOfValidDateTimeOrEmptyArray = (field) => 
          z.array(z.string().datetime()).refine(
            dates => dates.length === 0 || dates.every(date => !isNaN(Date.parse(date))), 
            {
              message: `El campo${field ? ` ${field}` : ""} debe ser un array vacío o contener solo fechas válidas en formato ISO 8601.`,
            }
          );

          validatorObject.isArrayOfValidDateOrEmptyArray = (field) => 
            z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).refine(
              dates => dates.length === 0 || dates.every(date => !isNaN(Date.parse(date))), 
              {
                message: `El campo${field ? ` ${field}` : ""} debe ser un array vacío o contener solo fechas válidas en formato YYYY-MM-DD.`,
              }
            );
          

            validatorObject.isValidIntervalTime = (field, referenceTimeInMinutes) => 
              z.number().refine(
                duration => duration > referenceTimeInMinutes, 
                {
                  message: `La duración en ${field} debe ser mayor a ${referenceTimeInMinutes} minutos.`,
                }
              );
        
      

              validatorObject.isValidCompanyName = (field) =>
                z.string().regex(/^[a-zA-Z0-9\s_.-]{3,100}$/, {
                  message: `El nombre de la empresa ${field ? `en el campo ${field}` : ""} debe tener entre 3 y 100 caracteres y solo puede contener letras, números, espacios, guiones bajos (_), puntos (.), guiones (-) y espacios.`,
                });
              

                validatorObject.isValidDescription = (field) =>
                  z.string().regex(/^[a-zA-Z0-9\s,._-]{3,500}$/, {
                    message: `La descripción ${field ? `en el campo ${field}` : ""} debe tener entre 3 y 500 caracteres y solo puede contener letras, números, espacios, comas, puntos, guiones bajos (_), guiones (-) y puntos.`,
                  });
                


                  validatorObject.isValidDevPasswordSecretKey = (field) =>
                    z.string().min(8).max(9).regex(/^[a-zA-Z0-9]+$/, {
                      message: `La clave secreta de desarrollador ${field ? `en el campo ${field}` : ""} debe tener entre 8 y 9 caracteres y solo puede contener letras y números.`,
                    });