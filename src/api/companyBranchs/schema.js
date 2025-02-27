import { z } from 'zod';

const locationSchema = z.object({
  street: z.string().nullable().default(null),
  streeNumber: z.string().nullable().default(null),
  floor: z.string().nullable().default(null),
  apartment: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
  postalCode: z.string().nullable().default(null),
  state: z.string().nullable().default(null),
  country: z.string().nullable().default(null),
  latitude: z.number().nullable().default(null),
  longitude: z.number().nullable().default(null),
}).nullable().default(null);

const companyBranchSchema = z.object({
  name: z.string(),
  companyId: z.string().nullable().default(null).optional(), // Si es ObjectId, es un string en Zod
  location: locationSchema,
});


  const querySchema = z.object({
    company: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
    ids: z.string()
        .regex(/^([0-9a-fA-F]{24})(,[0-9a-fA-F]{24})*$/, "Invalid ObjectId list")
        .optional()
});


export { companyBranchSchema, querySchema };
