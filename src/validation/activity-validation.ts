import { z, ZodType } from "zod";

export class ActivityValidation {
  static readonly CREATE: ZodType = z.object({
    organization_name: z.string().min(1).max(100),
    role: z.string().min(1).max(100),
    description: z.string().min(1).max(300),
    place: z.string().min(1).max(100),
    start_date: z.date(),
    end_date: z.date()
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    organization_name: z.string().min(1).max(100).optional(),
    role: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(300).optional(),
    place: z.string().min(1).max(100).optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional()
  })
}