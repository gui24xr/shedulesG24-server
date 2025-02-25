import { z } from 'zod'

export const customerSchema = z.object({
    dni: z.string().regex(/^\d{7,8}$/).refine((val) => val[0] !== "0"),
    customerNumber: z.string(),
    name: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().regex(/^[+]?(\d{1,4})?[-\s]?\(?(\d{2,3})\)?[-\s]?\d{3}[-\s]?\d{4}$/, {
        message: "Número telefónico inválido. Ejemplo: +1-234-567-8901 o 123-456-7890",
      }),
    email:z.string().email()
})