import { z, ZodType } from "zod";

export class UserValidataion {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    email: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
  });
}
