import { Schema, model, Document, Types } from 'mongoose';
import crypto from "crypto";

export interface IWaitlist extends Document {
    email: string;
    referrer?: string;
    referralCode: string;
    isVerified: boolean;
    points: number;
    isActive: boolean;
    verification: {
        token: string;
        expiresAt: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const waitlistSchema = new Schema<IWaitlist>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    referrer: {
        type: String,
        required: false,
    },
    referralCode: {
        type: String,
        default: () => Math.random().toString(36).substring(2, 15),
        unique: true,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    points: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    verification: {
        token: {
            type: String,
            default: () => crypto.randomBytes(32).toString('hex')
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours
        }
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const Waitlist = model<IWaitlist>('Waitlist', waitlistSchema); 