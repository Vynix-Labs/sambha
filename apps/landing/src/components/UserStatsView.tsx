import { useState } from 'react'
import { BackArrowIcon } from './icons'
import type { UserStats } from '../types/api'

interface UserStatsViewProps {
    userStats: UserStats
    totalUsers: number
    onResendVerification: () => void
    isResending: boolean
    onBack: () => void
    onViewLeaderboard: () => void
    isOwnStats?: boolean
}

export const UserStatsView = ({
    userStats,
    totalUsers,
    onResendVerification,
    isResending,
    onBack,
    onViewLeaderboard,
    isOwnStats = true
}: UserStatsViewProps) => {
    const { user } = userStats
    const [copiedState, setCopiedState] = useState<'referral' | 'stats' | null>(null)

    const handleCopyReferralLink = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}?ref=${user.referralCode}`)
            setCopiedState('referral')
            setTimeout(() => setCopiedState(null), 2000)
        } catch (error) {
            console.error('Failed to copy referral link:', error)
        }
    }

    const handleCopyCurrentURL = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopiedState('stats')
            setTimeout(() => setCopiedState(null), 2000)
        } catch (error) {
            console.error('Failed to copy stats URL:', error)
        }
    }

    return (
        <div className="w-full max-w-sm sm:max-w-md mx-auto">
            {/* Back button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors"
            >
                <BackArrowIcon />
                <span className="text-sm">Back to landing</span>
            </button>

            <div
                className="bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-lg"
                style={{
                    backdropFilter: 'var(--backdrop-blur-glass)',
                    WebkitBackdropFilter: 'var(--backdrop-blur-glass)'
                }}
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="font-display text-xl font-semibold text-white mb-2 tracking-[-0.03em]">
                        {isOwnStats ? 'Welcome back! 🎉' : 'User Stats 📊'}
                    </h2>
                    <p className="text-text-muted text-sm font-normal tracking-[-0.03em]">
                        {user.email}
                    </p>
                </div>

                {/* Verification Status - only show for own stats */}
                {isOwnStats && !user.isVerified && (
                    <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-200 text-sm font-medium">Email not verified</p>
                                <p className="text-yellow-300/80 text-xs mt-1">Check your email for verification link</p>
                            </div>
                            <button
                                onClick={onResendVerification}
                                disabled={isResending}
                                className="text-yellow-200 text-xs underline hover:text-yellow-100 disabled:opacity-50"
                            >
                                {isResending ? 'Sending...' : 'Resend'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Position */}
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                            #{user.rank}
                        </div>
                        <div className="text-text-muted text-sm">
                            Position
                        </div>
                    </div>

                    {/* Points */}
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                            {user.points}
                        </div>
                        <div className="text-text-muted text-sm">
                            Points
                        </div>
                    </div>

                    {/* Referrals */}
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                            {user.totalReferrals}
                        </div>
                        <div className="text-text-muted text-sm">
                            Referrals
                        </div>
                    </div>

                    {/* Total Users */}
                    <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                            {totalUsers}
                        </div>
                        <div className="text-text-muted text-sm">
                            Total Users
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-text-muted text-sm font-medium mb-2">
                        Share Link
                    </label>
                    <div
                        className="flex items-center gap-2 bg-input-bg border border-input-border rounded-lg px-4 py-3"
                        style={{
                            backdropFilter: 'var(--backdrop-blur-input)',
                            WebkitBackdropFilter: 'var(--backdrop-blur-input)'
                        }}
                    >
                        <code className="flex-1 text-white text-xs break-all">
                            {window.location.origin}?ref={user.referralCode}
                        </code>
                        <button
                            onClick={handleCopyReferralLink}
                            className={`text-xs transition-colors ${copiedState === 'referral'
                                ? 'text-green-400'
                                : 'text-text-muted hover:text-white'
                                }`}
                        >
                            {copiedState === 'referral' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-text-muted text-sm font-medium mb-2">
                        Share User's Stats
                    </label>
                    <div
                        className="flex items-center gap-2 bg-input-bg border border-input-border rounded-lg px-4 py-3"
                        style={{
                            backdropFilter: 'var(--backdrop-blur-input)',
                            WebkitBackdropFilter: 'var(--backdrop-blur-input)'
                        }}
                    >
                        <code className="flex-1 text-white text-xs break-all">
                            {window.location.href}
                        </code>
                        <button
                            onClick={handleCopyCurrentURL}
                            className={`text-xs transition-colors ${copiedState === 'stats'
                                ? 'text-green-400'
                                : 'text-text-muted hover:text-white'
                                }`}
                        >
                            {copiedState === 'stats' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={onViewLeaderboard}
                        className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-lg px-4 py-3 text-white font-medium text-sm transition-all duration-200"
                    >
                        🏆 View Leaderboard
                    </button>

                    <div className="text-center">
                        <p className="text-text-muted text-xs">
                            {isOwnStats
                                ? 'Invite friends to move up the waitlist! 🚀'
                                : 'Want to join the waitlist? Go back to landing! 🚀'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 