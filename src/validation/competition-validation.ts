import { Category, Predicate, Region } from "@prisma/client";
import {z, ZodType} from "zod";

export class CompetitionValidation{
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    year: z.date(),
    region: z.nativeEnum(Region),
    category: z.nativeEnum(Category),
    predicate: z.nativeEnum(Predicate)
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100).optional(),
    year: z.date().optional(),
    region: z.nativeEnum(Region).optional(),
    category: z.nativeEnum(Category).optional(),
    predicate: z.nativeEnum(Predicate).optional()
  })

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    year: z.date().optional(),
    region: z.nativeEnum(Region).optional(),
    category: z.nativeEnum(Category).optional(),
    predicate: z.nativeEnum(Predicate).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive()
  })
}