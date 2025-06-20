import { createRouter } from "@/lib/config/setups";
import * as handlers from "./waitlist.handler";
import * as routes from "./waitlist.routes";

const waitlistRouter = createRouter()
    // Join waitlist
    .openapi(routes.joinWaitlist, handlers.joinWaitlistHandler)
    // Verify email
    .openapi(routes.verifyEmail, handlers.verifyEmailHandler)
    // Get user stats
    .openapi(routes.getUserStats, handlers.getUserStatsHandler)
    // Get leaderboard
    .openapi(routes.getLeaderboard, handlers.getLeaderboardHandler)
    // Resend verification
    .openapi(routes.resendVerification, handlers.resendVerificationHandler)
    // Get total stats
    .openapi(routes.getTotalStats, handlers.getTotalStatsHandler);

export default waitlistRouter;
