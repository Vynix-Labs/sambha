import { z } from "zod";

export const errorSchema = z.object({
    success: z.boolean().default(false),
    error: z.string(),
});

export const successSchema = z.object({
    success: z.boolean().default(true),
    message: z.string().optional(),
    data: z.any().optional(),
});

export const IdParamsSchema = z.object({
    id: z.string().min(1, "ID is required"),
});

export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
});

export type ErrorResponse = z.infer<typeof errorSchema>;
export type SuccessResponse = z.infer<typeof successSchema>;
export type IdParams = z.infer<typeof IdParamsSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>; 