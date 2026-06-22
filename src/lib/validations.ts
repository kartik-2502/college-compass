import { z } from "zod";

export const collegeSearchSchema = z.object({
  q: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  minFees: z.coerce.number().int().min(0).optional(),
  maxFees: z.coerce.number().int().min(0).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(["rating", "fees_asc", "fees_desc", "name"]).optional().default("rating"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const compareSchema = z.object({
  ids: z.array(z.string()).min(2).max(3),
});

export const savedComparisonSchema = z.object({
  name: z.string().max(100).optional(),
  collegeIds: z.array(z.string()).min(2).max(3),
});

export type CollegeSearchParams = z.infer<typeof collegeSearchSchema>;
