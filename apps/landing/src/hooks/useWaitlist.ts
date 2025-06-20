import { useState, useCallback } from 'react'
import { WaitlistService } from '../services/waitlist.service'
import { LocalStorageService } from '../services/localStorage.service'
import type { UserStats, LeaderboardEntry, FormState } from '../types/api'
import { DEFAULT_LEADERBOARD_LIMIT, DEFAULT_TOTAL_USERS, VALIDATION, MESSAGES } from '../constants/app'

export const useWaitlist = () => {
    const [userStats, setUserStats] = useState<UserStats | null>(null)
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [totalUsers, setTotalUsers] = useState(DEFAULT_TOTAL_USERS)
    const [formState, setFormState] = useState<FormState>('idle')
    const [message, setMessage] = useState('')
    const [isResendingVerification, setIsResendingVerification] = useState(false)

    // Join waitlist
    const joinWaitlist = useCallback(async (email: string, referralCode?: string) => {
        setFormState('loading')
        setMessage('')

        try {
            const response = await WaitlistService.joinWaitlist({
                email: email.trim(),
                referralCode
            })

            // Save user data
            LocalStorageService.saveUser(response.data.user)
            LocalStorageService.saveUserEmail(email.trim())

            // Get fresh stats
            const stats = await WaitlistService.getUserStats(email.trim())
            setUserStats(stats)

            setFormState('success')
            return { success: true, user: response.data.user }
        } catch (error) {
            setFormState('error')

            if (error instanceof Error) {
                if (error.message.includes('already exists') || error.message.includes('CONFLICT')) {
                    // User already exists, try to get their stats
                    try {
                        const stats = await WaitlistService.getUserStats(email.trim())
                        setUserStats(stats)
                        LocalStorageService.saveUser(stats.user)
                        LocalStorageService.saveUserEmail(email.trim())
                        setFormState('idle')
                        setMessage('')
                        return { success: true, user: stats.user }
                    } catch (statsError) {
                        setMessage(MESSAGES.ALREADY_EXISTS)
                        return { success: false, error: 'User already exists' }
                    }
                } else {
                    setMessage(error.message)
                    return { success: false, error: error.message }
                }
            } else {
                setMessage(VALIDATION.GENERIC_ERROR)
                return { success: false, error: 'Unknown error' }
            }
        }
    }, [])

    // Get user stats
    const getUserStats = useCallback(async (email: string) => {
        try {
            const stats = await WaitlistService.getUserStats(email)
            setUserStats(stats)
            return stats
        } catch (error) {
            console.error('Failed to load user stats:', error)
            throw error
        }
    }, [])

    // Load leaderboard
    const loadLeaderboard = useCallback(async () => {
        try {
            // Try cache first
            const cachedLeaderboard = LocalStorageService.getLeaderboard()
            if (cachedLeaderboard && Array.isArray(cachedLeaderboard)) {
                setLeaderboard(cachedLeaderboard)
            }

            // Get fresh data
            const leaderboardData = await WaitlistService.getLeaderboard(DEFAULT_LEADERBOARD_LIMIT)
            const safeLeaderboard = Array.isArray(leaderboardData) ? leaderboardData : []
            setLeaderboard(safeLeaderboard)
            LocalStorageService.saveLeaderboard(safeLeaderboard)
        } catch (error) {
            console.error('Failed to load leaderboard:', error)
            setLeaderboard([])
        }
    }, [])

    // Load total stats
    const loadTotalStats = useCallback(async () => {
        try {
            const stats = await WaitlistService.getTotalStats()
            setTotalUsers(stats.totalUsers || DEFAULT_TOTAL_USERS)
            LocalStorageService.saveTotalStats(stats)
        } catch (error) {
            console.error('Failed to load total stats:', error)
        }
    }, [])

    // Resend verification
    const resendVerification = useCallback(async (email: string) => {
        setIsResendingVerification(true)
        try {
            await WaitlistService.resendVerification(email)
            return { success: true }
        } catch (error) {
            console.error('Failed to resend verification:', error)
            return { success: false, error }
        } finally {
            setIsResendingVerification(false)
        }
    }, [])

    // Reset form state
    const resetForm = useCallback(() => {
        setFormState('idle')
        setMessage('')
    }, [])

    return {
        // State
        userStats,
        leaderboard,
        totalUsers,
        formState,
        message,
        isResendingVerification,

        // Actions
        joinWaitlist,
        getUserStats,
        loadLeaderboard,
        loadTotalStats,
        resendVerification,
        resetForm,

        // Setters (for direct state management when needed)
        setUserStats,
        setFormState,
        setMessage,
        setTotalUsers
    }
} 