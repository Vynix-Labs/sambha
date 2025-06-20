import type { AppRouteHandler } from "@/lib/config/types";
import type {
    JoinWaitlistRoute,
    VerifyEmailRoute,
    GetUserStatsRoute,
    GetLeaderboardRoute,
    ResendVerificationRoute,
    GetTotalStatsRoute,
} from "./waitlist.routes";

import WaitlistService from "@/lib/services/waitlist.services";
import EmailService from "@/lib/services/email.services";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { WAITLIST_ERRORS } from "@/lib/config/constants";

// Join Waitlist Handler
export const joinWaitlistHandler: AppRouteHandler<JoinWaitlistRoute> = async (c) => {
    try {
        const requestData = c.req.valid("json");
        const result = await WaitlistService.joinWaitlist(requestData);

        // Send verification email
        try {
            const totalStats = await WaitlistService.getTotalStats();
            await EmailService.sendVerificationEmail({
                email: result.user.email,
                verificationToken: result.verificationToken,
                referralCode: result.user.referralCode
            }, totalStats.totalUsers);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            // Don't fail the registration if email fails
        }

        return c.json({
            success: true,
            data: {
                user: {
                    email: result.user.email,
                    referralCode: result.user.referralCode,
                    isVerified: result.user.isVerified,
                    points: result.user.points,
                    isActive: result.user.isActive,
                    createdAt: result.user.createdAt.toISOString(),
                    updatedAt: result.user.updatedAt.toISOString(),
                },
                message: "Successfully joined waitlist. Please check your email for verification.",
            },
        }, HttpStatusCodes.OK);
    } catch (error) {
        console.error('Error joining waitlist:', error);

        if (error instanceof Error) {
            if (error.message === WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED) {
                return c.json({
                    success: false,
                    error: "Email is already verified and on the waitlist",
                }, HttpStatusCodes.CONFLICT);
            }

            if (error.message === WAITLIST_ERRORS.INVALID_REFERRAL_CODE) {
                return c.json({
                    success: false,
                    error: "Invalid referral code",
                }, HttpStatusCodes.BAD_REQUEST);
            }
        }

        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to join waitlist',
        }, HttpStatusCodes.BAD_REQUEST);
    }
};

// Verify Email Handler
export const verifyEmailHandler: AppRouteHandler<VerifyEmailRoute> = async (c) => {
    try {
        const verificationData = c.req.valid("json");
        const user = await WaitlistService.verifyEmail(verificationData);

        // Send welcome email after successful verification
        try {
            const totalReferrals = await WaitlistService.getUserStats({ email: user.email });
            const totalStats = await WaitlistService.getTotalStats();
            await EmailService.sendWelcomeEmail({
                email: user.email,
                referralCode: user.referralCode,
                totalReferrals: totalReferrals.user.totalReferrals
            }, totalStats.totalUsers);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the verification if email fails
        }

        // Send referral success email to referrer if applicable
        if (user.referrer) {
            try {
                const referrerStats = await WaitlistService.getUserStats({ email: user.referrer });
                await EmailService.sendReferralSuccessEmail(
                    user.referrer,
                    user.email,
                    referrerStats.user.points,
                    referrerStats.user.rank
                );
            } catch (emailError) {
                console.error('Failed to send referral success email:', emailError);
                // Don't fail the verification if email fails
            }
        }

        return c.json({
            success: true,
            data: {
                user: {
                    email: user.email,
                    referralCode: user.referralCode,
                    isVerified: user.isVerified,
                    points: user.points,
                    isActive: user.isActive,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                },
                message: "Email verified successfully! You can now start referring friends.",
            },
        }, HttpStatusCodes.OK);
    } catch (error) {
        console.error('Error verifying email:', error);

        if (error instanceof Error) {
            if (error.message === WAITLIST_ERRORS.USER_NOT_FOUND) {
                return c.json({
                    success: false,
                    error: "User not found",
                }, HttpStatusCodes.NOT_FOUND);
            }

            if (error.message === WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED ||
                error.message === WAITLIST_ERRORS.INVALID_VERIFICATION_TOKEN ||
                error.message === WAITLIST_ERRORS.VERIFICATION_TOKEN_EXPIRED) {
                return c.json({
                    success: false,
                    error: error.message === WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED ? "Email is already verified" :
                        error.message === WAITLIST_ERRORS.INVALID_VERIFICATION_TOKEN ? "Invalid verification token" :
                            "Verification token has expired",
                }, HttpStatusCodes.BAD_REQUEST);
            }
        }

        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to verify email',
        }, HttpStatusCodes.BAD_REQUEST);
    }
};

// Get User Stats Handler
export const getUserStatsHandler: AppRouteHandler<GetUserStatsRoute> = async (c) => {
    try {
        const query = c.req.valid("query");
        const stats = await WaitlistService.getUserStats(query);

        return c.json({
            success: true,
            data: stats,
        }, HttpStatusCodes.OK);
    } catch (error) {
        console.error('Error getting user stats:', error);

        if (error instanceof Error) {
            if (error.message === WAITLIST_ERRORS.USER_NOT_FOUND) {
                return c.json({
                    success: false,
                    error: "User not found",
                }, HttpStatusCodes.NOT_FOUND);
            }

            if (error.message === WAITLIST_ERRORS.EMAIL_NOT_VERIFIED) {
                return c.json({
                    success: false,
                    error: "User email is not verified",
                }, HttpStatusCodes.FORBIDDEN);
            }

            if (error.message === WAITLIST_ERRORS.EMAIL_OR_USERID_REQUIRED) {
                return c.json({
                    success: false,
                    error: "Email or userId is required",
                }, HttpStatusCodes.BAD_REQUEST);
            }
        }

        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get user stats',
        }, HttpStatusCodes.BAD_REQUEST);
    }
};

// Get Leaderboard Handler
export const getLeaderboardHandler: AppRouteHandler<GetLeaderboardRoute> = async (c) => {
    const { limit } = c.req.valid("query");
    const leaderboard = await WaitlistService.getLeaderboard(limit);

    return c.json({
        success: true,
        data: leaderboard,
    }, HttpStatusCodes.OK);
};

// Resend Verification Handler
export const resendVerificationHandler: AppRouteHandler<ResendVerificationRoute> = async (c) => {
    try {
        const { email } = c.req.valid("json");
        const verificationToken = await WaitlistService.resendVerification(email);

        // Send verification email
        try {
            const user = await WaitlistService.findUserByEmail(email);
            const totalStats = await WaitlistService.getTotalStats();
            await EmailService.sendVerificationEmail({
                email,
                verificationToken,
                referralCode: user.referralCode
            }, totalStats.totalUsers);
        } catch (emailError) {
            console.error('Failed to resend verification email:', emailError);
            // Don't fail the process if email fails
        }

        return c.json({
            success: true,
            message: "Verification email sent successfully. Please check your inbox.",
        }, HttpStatusCodes.OK);
    } catch (error) {
        console.error('Error resending verification:', error);

        if (error instanceof Error) {
            if (error.message === WAITLIST_ERRORS.USER_NOT_FOUND) {
                return c.json({
                    success: false,
                    error: "User not found",
                }, HttpStatusCodes.NOT_FOUND);
            }

            if (error.message === WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED) {
                return c.json({
                    success: false,
                    error: "Email is already verified",
                }, HttpStatusCodes.BAD_REQUEST);
            }
        }

        return c.json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to resend verification email',
        }, HttpStatusCodes.BAD_REQUEST);
    }
};

// Get Total Stats Handler
export const getTotalStatsHandler: AppRouteHandler<GetTotalStatsRoute> = async (c) => {
    const stats = await WaitlistService.getTotalStats();

    return c.json({
        success: true,
        data: stats,
    }, HttpStatusCodes.OK);
};
