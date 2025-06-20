import { useState } from 'react'
import { MailIcon, ArrowRightIcon } from './icons'
import type { FormState } from '../types/api'

interface WaitlistFormProps {
    onSubmit: (email: string) => Promise<void>
    formState: FormState
    message: string
}

export const WaitlistForm = ({ onSubmit, formState, message }: WaitlistFormProps) => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim()) {
            return
        }

        await onSubmit(email.trim())
    }

    return (
        <div
            className="mx-auto w-full max-w-sm sm:max-w-md bg-glass-bg border border-glass-border rounded-2xl p-6 shadow-lg"
            style={{
                backdropFilter: 'var(--backdrop-blur-glass)',
                WebkitBackdropFilter: 'var(--backdrop-blur-glass)'
            }}
        >
            {/* Card header */}
            <div className="mb-4">
                <h2 className="font-display text-xl font-semibold text-white mb-2 tracking-[-0.03em]">
                    Join the waitlist
                </h2>
                <p className="text-text-muted text-base font-normal tracking-[-0.03em]">
                    Signup to be the first to use Sambha
                </p>
            </div>

            {/* Status message */}
            {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${formState === 'success'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-200'
                    : 'bg-red-500/10 border border-red-500/20 text-red-200'
                    }`}>
                    {message}
                </div>
            )}

            {/* Email form */}
            <form onSubmit={handleSubmit}>
                <div
                    className="flex items-center gap-2 bg-input-bg border border-input-border rounded-lg px-4 py-3 h-[59px] transition-all duration-200 hover:border-white/30 focus-within:border-white/40"
                    style={{
                        backdropFilter: 'var(--backdrop-blur-input)',
                        WebkitBackdropFilter: 'var(--backdrop-blur-input)'
                    }}
                >
                    <MailIcon />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        disabled={formState === 'loading'}
                        className="flex-1 bg-transparent text-white placeholder:text-placeholder font-normal text-base leading-relaxed tracking-[-0.02em] focus:outline-none disabled:opacity-50"
                        required
                    />
                    <button
                        type="submit"
                        className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:opacity-80 disabled:opacity-50"
                        disabled={formState === 'loading' || !email.trim()}
                    >
                        {formState === 'loading' ? (
                            <div className="w-[22px] h-[22px] border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <ArrowRightIcon />
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
} 