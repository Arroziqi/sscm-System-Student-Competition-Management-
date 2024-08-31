import { z, ZodType } from "zod";

export class PortfolioValidation{
  static readonly CREATE: ZodType = z.object({
    full_name: z.string().min(1).max(100),
    place_of_birth: z.string().min(1).max(100),
    date_of_birth: z.date(),
    domicile: z.string().min(1).max(100),
    phone_number: z.string().min(10).max(13),
    linkedin: z.string().min(1).max(100).optional(),
    github: z.string().min(1).max(100).optional(),
    instagram: z.string().min(1).max(100).optional(),
    website: z.string().min(1).max(100).optional(),
    summary: z.string().min(1).max(1000).optional()
  }) 
  static readonly UPDATE: ZodType = z.object({
    // id: z.number().positive(),
    full_name: z.string().min(1).max(100).optional(),
    place_of_birth: z.string().min(1).max(100).optional(),
    date_of_birth: z.date().optional(),
    domicile: z.string().min(1).max(100).optional(),
    phone_number: z.string().min(10).max(13).optional(),
    linkedin: z.string().min(1).max(100).optional(),
    github: z.string().min(1).max(100).optional(),
    instagram: z.string().min(1).max(100).optional(),
    website: z.string().min(1).max(100).optional(),
    summary: z.string().min(1).max(1000).optional()
  }) 
}