import { Waitlist, IWaitlist } from "@/lib/database/models/waitlist.model";
import {
    JoinWaitlistRequest,
    VerifyEmailRequest,
    GetStatsQuery
} from "@/lib/validators/waitlist.validators";
import crypto from "crypto";
import { POINTS_PER_REFERRAL, WAITLIST_ERRORS } from "../config/constants";

interface WaitlistStats {
    user: {
        email: string;
        referralCode: string;
        points: number;
        rank: number;
        isVerified: boolean;
        totalReferrals: number;
    };
    totalUsers: number;
}

interface WaitlistResponse {
    user: IWaitlist;
    verificationToken: string;
}

class WaitlistService {
    // Generate verification token
    private generateVerificationToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    // Calculate user rank based on points
    private async calculateRank(points: number): Promise<number> {
        const higherRankedUsers = await Waitlist.countDocuments({
            points: { $gt: points },
            isActive: true
        });
        return higherRankedUsers + 1;
    }

    // Join waitlist
    async joinWaitlist(data: JoinWaitlistRequest): Promise<WaitlistResponse> {
        const { email, referralCode } = data;

        // Check if user already exists
        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                throw new Error(WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED);
            }

            return {
                user: existingUser,
                verificationToken: existingUser.verification.token
            };
        }

        let referrerUser = null;
        if (referralCode) {
            referrerUser = await Waitlist.findOne({
                referralCode,
                isVerified: true,
                isActive: true
            });
            if (!referrerUser) {
                throw new Error(WAITLIST_ERRORS.INVALID_REFERRAL_CODE);
            }
        }

        // Create new user
        const newUser = new Waitlist({
            email,
            referrer: referrerUser?.email
        });

        await newUser.save();

        return {
            user: newUser,
            verificationToken: newUser.verification.token
        };
    }

    // Verify email
    async verifyEmail(data: VerifyEmailRequest): Promise<IWaitlist> {
        const { email, verificationToken } = data;

        const user = await Waitlist.findOne({ email });
        if (!user) {
            throw new Error(WAITLIST_ERRORS.USER_NOT_FOUND);
        }

        if (user.isVerified) {
            throw new Error(WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED);
        }

        if (user.verification.token !== verificationToken) {
            throw new Error(WAITLIST_ERRORS.INVALID_VERIFICATION_TOKEN);
        }

        if (user.verification.expiresAt < new Date()) {
            throw new Error(WAITLIST_ERRORS.VERIFICATION_TOKEN_EXPIRED);
        }

        user.isVerified = true;
        await user.save();

        // Award points to referrer if applicable
        if (user.referrer) {
            await this.awardReferralPoints(user.referrer);
        }

        return user;
    }

    // Award referral points
    private async awardReferralPoints(referrerEmail: string): Promise<void> {
        const referrer = await Waitlist.findOne({
            email: referrerEmail,
            isVerified: true,
            isActive: true
        });

        if (referrer) {
            referrer.points += POINTS_PER_REFERRAL;
            await referrer.save();
        }
    }

    // Get user stats
    async getUserStats(query: GetStatsQuery): Promise<WaitlistStats> {
        let user: IWaitlist | null;

        if (query.email) {
            user = await Waitlist.findOne({ email: query.email, isActive: true });
        } else if (query.userId) {
            user = await Waitlist.findById(query.userId);
        } else {
            throw new Error(WAITLIST_ERRORS.EMAIL_OR_USERID_REQUIRED);
        }

        if (!user) {
            throw new Error(WAITLIST_ERRORS.USER_NOT_FOUND);
        }

        if (!user.isVerified) {
            throw new Error(WAITLIST_ERRORS.EMAIL_NOT_VERIFIED);
        }

        // Calculate rank
        const rank = await this.calculateRank(user.points);

        // Count total referrals made by this user
        const totalReferrals = await Waitlist.countDocuments({
            referrer: user.email,
            isVerified: true,
            isActive: true
        });

        // Get total users count
        const totalUsers = await Waitlist.countDocuments({
            isVerified: true,
            isActive: true
        });

        return {
            user: {
                email: user.email,
                referralCode: user.referralCode,
                points: user.points,
                rank,
                isVerified: user.isVerified,
                totalReferrals
            },
            totalUsers
        };
    }

    // Get leaderboard
    async getLeaderboard(limit: number = 10): Promise<any[]> {
        const topUsers = await Waitlist.find({
            isVerified: true,
            isActive: true
        })
            .select('email points referralCode')
            .sort({ points: -1, createdAt: 1 })
            .limit(limit);

        return topUsers.map((user, index) => ({
            rank: index + 1,
            email: user.email.replace(/(.{3}).*(@.*)/, '$1***$2'), // Mask email for privacy
            points: user.points,
            referralCode: user.referralCode
        }));
    }

    // Resend verification
    async resendVerification(email: string): Promise<string> {
        const user = await Waitlist.findOne({ email });

        if (!user) {
            throw new Error(WAITLIST_ERRORS.USER_NOT_FOUND);
        }

        if (user.isVerified) {
            throw new Error(WAITLIST_ERRORS.EMAIL_ALREADY_VERIFIED);
        }

        const verificationToken = this.generateVerificationToken();

        user.verification.token = verificationToken;
        user.verification.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
        await user.save();

        return verificationToken;
    }

    // Find user by email (without verification requirement)
    async findUserByEmail(email: string): Promise<IWaitlist> {
        const user = await Waitlist.findOne({ email, isActive: true });
        if (!user) {
            throw new Error(WAITLIST_ERRORS.USER_NOT_FOUND);
        }
        return user;
    }

    // Get total stats
    async getTotalStats(): Promise<{ totalUsers: number; totalVerified: number }> {
        const totalUsers = await Waitlist.countDocuments({ isActive: true });
        const totalVerified = await Waitlist.countDocuments({
            isVerified: true,
            isActive: true
        });

        return {
            totalUsers,
            totalVerified
        };
    }
}

export default new WaitlistService();
