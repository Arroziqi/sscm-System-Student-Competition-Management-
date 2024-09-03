import { workStatus } from "@prisma/client";
import { z, ZodType } from "zod";

export class ExperienceValidation {
  static readonly CREATE: ZodType = z.object({
    company_name: z.string().min(1).max(100),
    position: z.string().min(1).max(100),
    status: z.nativeEnum(workStatus),
    description: z.string().min(1).max(300),
    place: z.string().min(1).max(100),
    start_date: z.date(),
    end_date: z.date()
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    company_name: z.string().min(1).max(100).optional(),
    position: z.string().min(1).max(100).optional(),
    status: z.nativeEnum(workStatus).optional(),
    description: z.string().min(1).max(300).optional(),
    place: z.string().min(1).max(100).optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional()
  })
}