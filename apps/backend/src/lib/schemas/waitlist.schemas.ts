import { z } from "zod";

// Waitlist user schema
export const waitlistUserSchema = z.object({
    email: z.string(),
    referralCode: z.string(),
    isVerified: z.boolean(),
    points: z.number(),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Join waitlist response schema
export const joinWaitlistResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: waitlistUserSchema,
        message: z.string(),
    }),
});

// Verify email response schema
export const verifyEmailResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: waitlistUserSchema,
        message: z.string(),
    }),
});

// User stats schema
export const userStatsSchema = z.object({
    email: z.string(),
    referralCode: z.string(),
    points: z.number(),
    rank: z.number(),
    isVerified: z.boolean(),
    totalReferrals: z.number(),
});

// Stats response schema
export const statsResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        user: userStatsSchema,
        totalUsers: z.number(),
    }),
});

// Leaderboard response schema
export const leaderboardResponseSchema = z.object({
    success: z.boolean(),
    data: z.array(z.object({
        rank: z.number(),
        email: z.string(),
        points: z.number(),
        referralCode: z.string(),
    })),
});

// Total stats response schema
export const totalStatsResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        totalUsers: z.number(),
        totalVerified: z.number(),
    }),
}); 