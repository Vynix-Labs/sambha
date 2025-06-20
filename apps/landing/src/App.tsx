import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { UserStatsView } from './components/UserStatsView'
import { LeaderboardView } from './components/LeaderboardView'
import { WaitlistForm } from './components/WaitlistForm'
import { SocialProof } from './components/SocialProof'
import { useWaitlist } from './hooks/useWaitlist'
import { LocalStorageService } from './services/localStorage.service'
import type { AppView } from './types/api'
import { URL_PARAMS } from './constants/app'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing')
  const [isViewingOwnStats, setIsViewingOwnStats] = useState(true)

  const {
    userStats,
    leaderboard,
    totalUsers,
    formState,
    message,
    isResendingVerification,
    joinWaitlist,
    getUserStats,
    loadLeaderboard,
    loadTotalStats,
    resendVerification,
    resetForm,
    setUserStats
  } = useWaitlist()

  useEffect(() => {
    const initializeApp = async () => {
      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search)
      const refParam = urlParams.get(URL_PARAMS.REF)
      const userParam = urlParams.get(URL_PARAMS.USER)

      if (refParam) {
        // Save referral code to localStorage for future use
        LocalStorageService.saveReferralCode(refParam)
      }

      // Check if we have a user email in URL parameters
      if (userParam) {
        try {
          // Fetch stats for the specified user
          await getUserStats(userParam)
          setCurrentView('stats')

          // Check if this is the current user's own stats
          const savedEmail = LocalStorageService.getUserEmail()
          setIsViewingOwnStats(savedEmail === userParam)


          // Clean URL without reloading the page (keep only user param)
          const newUrl = `${window.location.pathname}?user=${encodeURIComponent(userParam)}`
          window.history.replaceState({}, '', newUrl)

          loadLeaderboard()
          loadTotalStats()

          return
        } catch (error) {
          console.error('Failed to load user stats from URL:', error)

          const newUrl = window.location.pathname
          window.history.replaceState({}, '', newUrl)
        }
      } else if (refParam) {
        const newUrl = window.location.pathname
        window.history.replaceState({}, '', newUrl)
      }

      // Check for existing user in localStorage (only if no user param was provided)
      const existingUser = LocalStorageService.getUser()
      const savedEmail = LocalStorageService.getUserEmail()

      if (existingUser && savedEmail) {
        try {
          // Try to get fresh stats for existing user
          await getUserStats(savedEmail)
          setCurrentView('stats')
          setIsViewingOwnStats(true)

          // Load leaderboard
          loadLeaderboard()
        } catch (error) {
          console.error('Failed to refresh user data:', error)
          setUserStats({
            user: {
              email: existingUser.email,
              referralCode: existingUser.referralCode,
              isVerified: existingUser.isVerified,
              points: existingUser.points,
              isActive: existingUser.isActive,
              createdAt: existingUser.createdAt,
              updatedAt: existingUser.updatedAt,
              rank: 1, // Default fallback
              totalReferrals: 0 // Default fallback
            }
          })
          setCurrentView('stats')
          setIsViewingOwnStats(true)
        }
      }

      // Load total users count
      loadTotalStats()
    }

    initializeApp()
  }, [getUserStats, loadLeaderboard, loadTotalStats, setUserStats])

  const handleWaitlistSubmit = async (email: string) => {
    const savedReferralCode = LocalStorageService.getReferralCode()
    const result = await joinWaitlist(email, savedReferralCode || undefined)

    if (result.success) {
      setCurrentView('stats')
      setIsViewingOwnStats(true)
      loadLeaderboard()
      loadTotalStats()
    }
  }

  // Handle resend verification
  const handleResendVerification = async () => {
    if (!userStats?.user.email) return
    await resendVerification(userStats.user.email)
  }

  // Navigation handlers
  const handleBackToLanding = () => {
    setCurrentView('landing')
    resetForm()
    setIsViewingOwnStats(true)
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname)
    // Don't clear user data - they can come back to stats
  }

  const handleViewLeaderboard = () => {
    if (!leaderboard || leaderboard.length === 0) {
      loadLeaderboard()
    }
    setCurrentView('leaderboard')
  }

  const handleBackToStats = () => {
    setCurrentView('stats')
  }

  if (currentView === 'stats' && userStats) {
    return (
      <Layout>
        <UserStatsView
          userStats={userStats}
          totalUsers={totalUsers}
          onResendVerification={handleResendVerification}
          isResending={isResendingVerification}
          onBack={handleBackToLanding}
          onViewLeaderboard={handleViewLeaderboard}
          isOwnStats={isViewingOwnStats}
        />
      </Layout>
    )
  }

  if (currentView === 'leaderboard') {
    return (
      <Layout>
        <LeaderboardView
          leaderboard={leaderboard}
          currentUserEmail={userStats?.user.email}
          onBack={handleBackToStats}
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-full max-w-xl lg:max-w-4xl mx-auto text-center">
        {/* Main heading with gradient text */}
        <h1
          className="font-display text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-11xl font-medium leading-[0.85] mb-4 sm:mb-6 tracking-[-0.03em]"
          style={{
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Sambha
        </h1>

        <p className="text-white text-lg sm:text-xl lg:text-2xl font-normal leading-tight tracking-[-0.04em] mb-8 sm:mb-12">
          Simplifying Event Planning.
        </p>

        {/* Waitlist Form */}
        <WaitlistForm
          onSubmit={handleWaitlistSubmit}
          formState={formState}
          message={message}
        />

        {/* Social Proof */}
        <SocialProof totalUsers={totalUsers} />
      </div>
    </Layout>
  )
}

export default App
