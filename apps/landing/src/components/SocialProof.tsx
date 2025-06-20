interface SocialProofProps {
    totalUsers: number
}

export const SocialProof = ({ totalUsers }: SocialProofProps) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {/* Overlapping avatars */}
            <div className="flex -space-x-1.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 border-2 border-black shadow-sm" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-black shadow-sm" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-black shadow-sm" />
            </div>
            <p className="text-text-muted text-base font-normal ml-2">
                Join {totalUsers.toLocaleString()}+ already onboard
            </p>
        </div>
    )
} 