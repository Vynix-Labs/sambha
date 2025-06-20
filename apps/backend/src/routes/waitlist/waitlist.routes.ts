import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import {
    joinWaitlistSchema,
    verifyEmailSchema,
    getStatsQuerySchema,
    resendVerificationSchema,
} from "@/lib/validators/waitlist.validators";
import { errorSchema, successSchema } from "@/lib/schemas/common.schemas";
import {
    joinWaitlistResponseSchema,
    verifyEmailResponseSchema,
    statsResponseSchema,
    leaderboardResponseSchema,
    totalStatsResponseSchema,
} from "@/lib/schemas/waitlist.schemas";
import { API_TAGS } from "@/lib/config/constants";



// Routes
export const joinWaitlist = createRoute({
    path: "/waitlist",
    method: "post",
    summary: "Join Waitlist",
    description: "Join the waitlist with email and optional referral code",
    request: {
        body: jsonContentRequired(joinWaitlistSchema, "Join waitlist data"),
    },
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(joinWaitlistResponseSchema, "Successfully joined waitlist"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Invalid request data"),
        [HttpStatusCodes.CONFLICT]: jsonContent(errorSchema, "Email already exists"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(joinWaitlistSchema),
            "Validation error(s)",
        ),
    },
});

export const verifyEmail = createRoute({
    path: "/waitlist/verify",
    method: "post",
    summary: "Verify Email",
    description: "Verify email address with verification token",
    request: {
        body: jsonContentRequired(verifyEmailSchema, "Email verification data"),
    },
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(verifyEmailResponseSchema, "Email verified successfully"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Invalid verification token"),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(errorSchema, "User not found"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(verifyEmailSchema),
            "Validation error(s)",
        ),
    },
});

export const getUserStats = createRoute({
    path: "/waitlist/stats",
    method: "get",
    summary: "Get User Stats",
    description: "Get user points and rank by email or user ID",
    request: {
        query: getStatsQuerySchema,
    },
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(statsResponseSchema, "User stats retrieved successfully"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Invalid query parameters"),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(errorSchema, "User not found"),
        [HttpStatusCodes.FORBIDDEN]: jsonContent(errorSchema, "Email not verified"),
    },
});

export const getLeaderboard = createRoute({
    path: "/waitlist/leaderboard",
    method: "get",
    summary: "Get Leaderboard",
    description: "Get top users by points",
    request: {
        query: z.object({
            limit: z.coerce.number().int().positive().max(50).default(10),
        }),
    },
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(leaderboardResponseSchema, "Leaderboard retrieved successfully"),
    },
});

export const resendVerification = createRoute({
    path: "/waitlist/resend-verification",
    method: "post",
    summary: "Resend Verification Email",
    description: "Resend verification email to user",
    request: {
        body: jsonContentRequired(resendVerificationSchema, "Resend verification data"),
    },
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(successSchema, "Verification email sent"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(errorSchema, "Email already verified or invalid"),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(errorSchema, "User not found"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(resendVerificationSchema),
            "Validation error(s)",
        ),
    },
});

export const getTotalStats = createRoute({
    path: "/waitlist/total-stats",
    method: "get",
    summary: "Get Total Stats",
    description: "Get total waitlist statistics",
    tags: [API_TAGS.WAITLIST],
    responses: {
        [HttpStatusCodes.OK]: jsonContent(totalStatsResponseSchema, "Total stats retrieved successfully"),
    },
});

export type JoinWaitlistRoute = typeof joinWaitlist;
export type VerifyEmailRoute = typeof verifyEmail;
export type GetUserStatsRoute = typeof getUserStats;
export type GetLeaderboardRoute = typeof getLeaderboard;
export type ResendVerificationRoute = typeof resendVerification;
export type GetTotalStatsRoute = typeof getTotalStats;
