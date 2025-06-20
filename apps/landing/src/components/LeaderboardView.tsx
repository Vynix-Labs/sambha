import { BackArrowIcon } from './icons'
import type { LeaderboardEntry } from '../types/api'

interface LeaderboardViewProps {
    leaderboard: LeaderboardEntry[]
    currentUserEmail?: string
    onBack: () => void
}

const getRankEmoji = (rank: number): string => {
    switch (rank) {
        case 1: return '🥇'
        case 2: return '🥈'
        case 3: return '🥉'
        default: return `#${rank}`
    }
}

const maskEmail = (email: string): string => {
    return email.split('@')[0] + '***'
}

export const LeaderboardView = ({
    leaderboard,
    currentUserEmail,
    onBack
}: LeaderboardViewProps) => {
    return (
        <div className="w-sm sm:w-md mx-auto">
            {/* Back button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-6 transition-colors"
            >
                <BackArrowIcon />
                <span className="text-sm">Back to stats</span>
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
                    <h3 className="font-display text-xl font-semibold text-white mb-2 tracking-[-0.03em]">
                        🏆 Leaderboard
                    </h3>
                    <p className="text-text-muted text-sm font-normal tracking-[-0.03em]">
                        Top performers this week
                    </p>
                </div>

                {/* Leaderboard List */}
                {leaderboard.length > 0 ? (
                    <div className="space-y-3">
                        {leaderboard.map((entry) => {
                            const isCurrentUser = entry.email === currentUserEmail

                            return (
                                <div
                                    key={entry.email}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isCurrentUser
                                        ? 'bg-blue-500/10 border border-blue-500/20'
                                        : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Rank */}
                                        <div className="text-lg font-bold text-white min-w-[2rem] text-center">
                                            {getRankEmoji(entry.rank)}
                                        </div>

                                        {/* User Info */}
                                        <div>
                                            <div className={`font-medium text-sm ${isCurrentUser ? 'text-blue-200' : 'text-white'
                                                }`}>
                                                {maskEmail(entry.email)}
                                                {isCurrentUser && (
                                                    <span className="ml-2 text-xs text-blue-300">(You)</span>
                                                )}
                                            </div>
                                            <div className="text-text-muted text-xs">
                                                {entry.totalReferrals || 0} referral{(entry.totalReferrals || 0) !== 1 ? 's' : ''}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Points */}
                                    <div className="text-right">
                                        <div className={`font-bold ${isCurrentUser ? 'text-blue-200' : 'text-white'
                                            }`}>
                                            {entry.points}
                                        </div>
                                        <div className="text-text-muted text-xs">
                                            points
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎯</div>
                        <p className="text-text-muted text-sm">
                            Be the first to join the leaderboard!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
} 