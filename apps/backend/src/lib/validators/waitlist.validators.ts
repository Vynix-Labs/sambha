import { z } from "zod";

// Join waitlist validation
export const joinWaitlistSchema = z.object({
    email: z.string().email("Invalid email format"),
    referralCode: z.string().optional(),
});

// Verify email validation
export const verifyEmailSchema = z.object({
    email: z.string().email("Invalid email format"),
    verificationToken: z.string().min(1, "Verification token is required"),
});

// Get stats validation (query params)
export const getStatsQuerySchema = z.object({
    email: z.string().email("Invalid email format").optional(),
    userId: z.string().optional(),
}).refine(
    (data) => data.email || data.userId,
    {
        message: "Either email or userId must be provided",
        path: ["email"],
    }
);

// Resend verification validation
export const resendVerificationSchema = z.object({
    email: z.string().email("Invalid email format"),
});

export type JoinWaitlistRequest = z.infer<typeof joinWaitlistSchema>;
export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;
export type GetStatsQuery = z.infer<typeof getStatsQuerySchema>;
export type ResendVerificationRequest = z.infer<typeof resendVerificationSchema>;
