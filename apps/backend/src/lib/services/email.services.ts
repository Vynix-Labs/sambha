import sendEmail from "@/lib/email/sender";
import env from "@/lib/config/env";

interface VerificationEmailData {
    email: string;
    verificationToken: string;
    referralCode: string;
}

interface WelcomeEmailData {
    email: string;
    referralCode: string;
    totalReferrals?: number;
}

export class EmailService {
    static generateVerificationEmailTemplate(email: string, verificationToken: string, totalWaitlistCount: number): string {
        const verificationUrl = `${env.FRONTEND_URL || 'http://localhost:3000'}/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Sambha! 🎉</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Share+Tech&display=swap" rel="stylesheet"> 
                <style>                   
                * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Share Tech', sans-serif, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background-color: #333333; /* fallback */
                        background: linear-gradient(135deg, #020119 0%, #1a1a2e 100%);
                        color: #ffffff;
                        line-height: 1.6;
                        padding: 20px; 
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 16px;
                        backdrop-filter: blur(14px);
                        overflow: hidden;
                    }
                    
                    .header {
                        background: linear-gradient(135deg, rgba(43, 43, 207, 0.3), rgba(107, 181, 255, 0.2));
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    
                    .logo {
                        font-size: 48px;
                        font-weight: 700;
                        background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 10px;
                        letter-spacing: -2px;
                    }
                    
                    .subtitle {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 18px;
                        font-weight: 500;
                    }
                    
                    .content {
                        padding: 40px 30px;
                    }
                    
                    .greeting {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 20px;
                        color: #ffffff;
                    }
                    
                    .message {
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.9);
                        margin-bottom: 30px;
                        line-height: 1.7;
                    }
                    
                    .verify-button {
                        display: inline-block;
                        background: linear-gradient(135deg, #2B2BCF, #6AB5FF);
                        color: white;
                        text-decoration: none;
                        padding: 16px 32px;
                        border-radius: 12px;
                        font-weight: 600;
                        font-size: 16px;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 25px rgba(43, 43, 207, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    
                    .verify-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 35px rgba(43, 43, 207, 0.4);
                    }
                    
                    .divider {
                        height: 1px;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                        margin: 30px 0;
                    }
                    
                    .footer {
                        text-align: center;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 14px;
                        padding: 30px;
                        background: rgba(0, 0, 0, 0.2);
                    }
                    
                    .footer a {
                        color: rgba(255, 255, 255, 0.8);
                        text-decoration: none;
                    }
                    
                    .fun-fact {
                        background: rgba(107, 181, 255, 0.1);
                        border: 1px solid rgba(107, 181, 255, 0.3);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        text-align: center;
                    }
                    
                    .fun-fact .emoji {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">Sambha</div>
                        <div class="subtitle">Simplifying Event Planning</div>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">Hey there! 👋</div>
                        
                        <div class="message">
                            <p>Welcome to the cool kids' club! 😎</p>
                            
                            <p>Quick verification needed before you can start earning referral points. One click and you're in!</p>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verificationUrl}" class="verify-button">
                                ✨ Verify My Email ✨
                            </a>
                        </div>
                        
                        <div class="fun-fact">
                            <div class="emoji">🚀</div>
                            <p>Join ${totalWaitlistCount.toLocaleString()}+ people already onboard this rocket ship!</p>
                        </div>
                        
                        <div class="divider"></div>
                        
                        <div class="message" style="font-size: 14px; color: rgba(255, 255, 255, 0.7);">
                            <p>Link expires in 24 hours. Having trouble? Copy this URL:<br>
                            <code style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; word-break: break-all;">${verificationUrl}</code></p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Made with 💜 by the Sambha team</p>
                        <p style="margin-top: 10px;">
                            <a href="${env.FRONTEND_URL}">Visit Sambha</a> • 
                            <a href="${env.FRONTEND_URL}/support">Need Help?</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    static generateWelcomeEmailTemplate(email: string, referralCode: string, position: number, totalWaitlistCount: number): string {
        const shareUrl = `${env.FRONTEND_URL || 'http://localhost:3000'}?ref=${referralCode}`;
        const twitterText = encodeURIComponent(`Just joined the Sambha waitlist! 🎉 Event planning made easy. Join me: ${shareUrl}`);
        const linkedinText = encodeURIComponent(`Excited to join Sambha! Event planning simplified: ${shareUrl}`);

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to the Sambha Family! 🎊</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Share+Tech&display=swap');
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Share Tech', sans-serif, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background-color: #333333; /* fallback */
                        background: linear-gradient(135deg, #020119 0%, #1a1a2e 100%);
                        color: #ffffff;
                        line-height: 1.6;
                        padding: 20px;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 16px;
                        backdrop-filter: blur(14px);
                        overflow: hidden;
                    }
                    
                    .header {
                        background: linear-gradient(135deg, rgba(201, 111, 255, 0.3), rgba(107, 181, 255, 0.2));
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    
                    .logo {
                        font-size: 48px;
                        font-weight: 700;
                        background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 10px;
                        letter-spacing: -2px;
                    }
                    
                    .celebration {
                        font-size: 64px;
                        margin-bottom: 15px;
                        animation: bounce 2s infinite;
                    }
                    
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-10px); }
                        60% { transform: translateY(-5px); }
                    }
                    
                    .content {
                        padding: 40px 30px;
                    }
                    
                    .greeting {
                        font-size: 28px;
                        font-weight: 700;
                        margin-bottom: 20px;
                        color: #ffffff;
                        text-align: center;
                    }
                    
                    .message {
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.9);
                        margin-bottom: 25px;
                        line-height: 1.7;
                    }
                    
                    .stats-card {
                        background: rgba(43, 43, 207, 0.2);
                        border: 1px solid rgba(107, 181, 255, 0.3);
                        border-radius: 16px;
                        padding: 25px;
                        text-align: center;
                        margin: 25px 0;
                    }
                    
                    .position {
                        font-size: 36px;
                        font-weight: 700;
                        color: #6AB5FF;
                        margin-bottom: 5px;
                    }
                    
                    .position-label {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    .referral-section {
                        background: rgba(201, 111, 255, 0.1);
                        border: 1px solid rgba(201, 111, 255, 0.3);
                        border-radius: 16px;
                        padding: 25px;
                        margin: 25px 0;
                    }
                    
                    .referral-code {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px dashed rgba(255, 255, 255, 0.3);
                        border-radius: 12px;
                        padding: 15px;
                        font-family: 'Courier New', monospace;
                        font-size: 18px;
                        font-weight: 600;
                        text-align: center;
                        margin: 15px 0;
                        letter-spacing: 2px;
                        color: #C96FFF;
                    }
                    
                    .share-buttons {
                        display: flex;
                        gap: 15px;
                        justify-content: center;
                        margin: 25px 0;
                        flex-wrap: wrap;
                    }
                    
                    .share-button {
                        display: inline-block;
                        padding: 12px 20px;
                        border-radius: 12px;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s ease;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }
                    
                    .twitter {
                        background: linear-gradient(135deg, #1DA1F2, #0D8BD9);
                        color: white;
                    }
                    
                    .linkedin {
                        background: linear-gradient(135deg, #0077B5, #005885);
                        color: white;
                    }
                    
                    .copy-link {
                        background: rgba(255, 255, 255, 0.1);
                        color: rgba(255, 255, 255, 0.9);
                    }
                    
                    .share-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                    }
                    
                    .footer {
                        text-align: center;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 14px;
                        padding: 30px;
                        background: rgba(0, 0, 0, 0.2);
                    }
                    
                    .footer a {
                        color: rgba(255, 255, 255, 0.8);
                        text-decoration: none;
                    }
                    
                    .divider {
                        height: 1px;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                        margin: 30px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="celebration">🎊</div>
                        <div class="logo">Sambha</div>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">You're IN! 🚀</div>
                        
                        <div class="message">
                            <p>Welcome to the Sambha family! 🥳</p>
                            
                            <p>You're now part of our event planning revolution with ${totalWaitlistCount.toLocaleString()}+ members. Ready to climb the ranks?</p>
                        </div>
                        
                        <div class="stats-card">
                            <div class="position">#${position}</div>
                            <div class="position-label">Your Position</div>
                            <p style="margin-top: 15px; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
                                ${position <= 100 ? "VIP section! 🌟" :
                position <= 500 ? "Early bird! 🐛" :
                    "Perfect timing! 🕺"}
                            </p>
                        </div>
                        
                        <div class="message">
                            <p><strong>Your referral code = 10 points each!</strong> 🎯</p>
                        </div>
                        
                        <div class="referral-section">
                            <h3 style="text-align: center; margin-bottom: 15px; color: #C96FFF;">🎁 Your Referral Code</h3>
                            <div class="referral-code">${referralCode}</div>
                            <p style="text-align: center; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
                                Share and watch your points soar! 📈
                            </p>
                        </div>
                        
                        <div class="share-buttons">
                            <a href="https://twitter.com/intent/tweet?text=${twitterText}" class="share-button twitter" target="_blank">
                                🐦 Tweet
                            </a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" class="share-button linkedin" target="_blank">
                                💼 LinkedIn
                            </a>
                            <a href="${shareUrl}" class="share-button copy-link" onclick="navigator.clipboard.writeText('${shareUrl}'); alert('Link copied! 🚀')">
                                📋 Copy Link
                            </a>
                        </div>
                        
                        <div class="divider"></div>
                        
                        <div class="message" style="text-align: center; font-size: 14px; color: rgba(255, 255, 255, 0.7);">
                            <p>We'll keep you updated with launch news. No spam, just the good stuff! 📧</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Made with 💜 by the Sambha team</p>
                        <p style="margin-top: 10px;">
                            <a href="${env.FRONTEND_URL}">Visit Sambha</a> • 
                            <a href="${env.FRONTEND_URL}/support">Need Help?</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    static generateReferralSuccessEmailTemplate(email: string, referredEmail: string, newPoints: number, newRank: number): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cha-ching! Referral Success! 💰</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Share+Tech&display=swap');
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Share Tech', sans-serif, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        background-color: #333333; /* fallback */
                        background: linear-gradient(135deg, #020119 0%, #1a1a2e 100%);
                        color: #ffffff;
                        line-height: 1.6;
                        padding: 20px;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 16px;
                        backdrop-filter: blur(14px);
                        overflow: hidden;
                    }
                    
                    .header {
                        background: linear-gradient(135deg, rgba(46, 204, 113, 0.3), rgba(107, 181, 255, 0.2));
                        padding: 40px 30px;
                        text-align: center;
                        position: relative;
                    }
                    
                    .logo {
                        font-size: 48px;
                        font-weight: 700;
                        background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 10px;
                        letter-spacing: -2px;
                    }
                    
                    .celebration {
                        font-size: 64px;
                        margin-bottom: 15px;
                        animation: shake 0.5s infinite;
                    }
                    
                    @keyframes shake {
                        0% { transform: translate(1px, 1px) rotate(0deg); }
                        10% { transform: translate(-1px, -2px) rotate(-1deg); }
                        20% { transform: translate(-3px, 0px) rotate(1deg); }
                        30% { transform: translate(3px, 2px) rotate(0deg); }
                        40% { transform: translate(1px, -1px) rotate(1deg); }
                        50% { transform: translate(-1px, 2px) rotate(-1deg); }
                        60% { transform: translate(-3px, 1px) rotate(0deg); }
                        70% { transform: translate(3px, 1px) rotate(-1deg); }
                        80% { transform: translate(-1px, -1px) rotate(1deg); }
                        90% { transform: translate(1px, 2px) rotate(0deg); }
                        100% { transform: translate(1px, -2px) rotate(-1deg); }
                    }
                    
                    .content {
                        padding: 40px 30px;
                    }
                    
                    .greeting {
                        font-size: 28px;
                        font-weight: 700;
                        margin-bottom: 20px;
                        color: #ffffff;
                        text-align: center;
                    }
                    
                    .message {
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.9);
                        margin-bottom: 25px;
                        line-height: 1.7;
                    }
                    
                    .success-card {
                        background: linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(26, 188, 156, 0.1));
                        border: 1px solid rgba(46, 204, 113, 0.4);
                        border-radius: 16px;
                        padding: 25px;
                        text-align: center;
                        margin: 25px 0;
                    }
                    
                    .points-earned {
                        font-size: 48px;
                        font-weight: 700;
                        color: #2ECC71;
                        margin-bottom: 5px;
                    }
                    
                    .points-label {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 15px;
                    }
                    
                    .stats-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin: 25px 0;
                    }
                    
                    .stat-item {
                        background: rgba(255, 255, 255, 0.07);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                    }
                    
                    .stat-number {
                        font-size: 24px;
                        font-weight: 700;
                        color: #6AB5FF;
                        margin-bottom: 5px;
                    }
                    
                    .stat-label {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    .referral-info {
                        background: rgba(107, 181, 255, 0.1);
                        border: 1px solid rgba(107, 181, 255, 0.3);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                    
                    .footer {
                        text-align: center;
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 14px;
                        padding: 30px;
                        background: rgba(0, 0, 0, 0.2);
                    }
                    
                    .footer a {
                        color: rgba(255, 255, 255, 0.8);
                        text-decoration: none;
                    }
                    
                    .divider {
                        height: 1px;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                        margin: 30px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="celebration">💰</div>
                        <div class="logo">Sambha</div>
                    </div>
                    
                    <div class="content">
                        <div class="greeting">BOOM! You scored! 🎯</div>
                        
                        <div class="message">
                            <p>Someone used your referral code! 🎵</p>
                            
                            <p><strong>${referredEmail}</strong> just joined thanks to you! 🏆</p>
                        </div>
                        
                        <div class="success-card">
                            <div class="points-earned">+10</div>
                            <div class="points-label">Points Earned!</div>
                            <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">
                                Your referral game is strong! 💪
                            </p>
                        </div>
                        
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number">${newPoints}</div>
                                <div class="stat-label">Total Points</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number">#${newRank}</div>
                                <div class="stat-label">Your Rank</div>
                            </div>
                        </div>
                        
                        <div class="referral-info">
                            <h4 style="color: #6AB5FF; margin-bottom: 10px; text-align: center;">🚀 Keep it going!</h4>
                            <p style="text-align: center; color: rgba(255, 255, 255, 0.8); font-size: 14px;">
                                Every referral = 10 points. Who knows? You might hit #1! 😉
                            </p>
                        </div>
                        
                        <div class="divider"></div>
                        
                        <div class="message" style="text-align: center; font-size: 14px; color: rgba(255, 255, 255, 0.7);">
                            <p>Check your stats anytime on our waitlist page! 🌟</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Made with 💜 by the Sambha team</p>
                        <p style="margin-top: 10px;">
                            <a href="${env.FRONTEND_URL}">Visit Sambha</a> • 
                            <a href="${env.FRONTEND_URL}/support">Need Help?</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    async sendVerificationEmail(data: VerificationEmailData, totalWaitlistCount: number): Promise<void> {
        try {
            const html = EmailService.generateVerificationEmailTemplate(data.email, data.verificationToken, totalWaitlistCount);

            await sendEmail(
                data.email,
                "🚀 Verify Your Email - Welcome to Sambha!",
                html
            );

            console.log(`Verification email sent to: ${data.email}`);
        } catch (error) {
            console.error('Failed to send verification email:', error);
            throw new Error('Failed to send verification email');
        }
    }

    async sendWelcomeEmail(data: WelcomeEmailData, totalWaitlistCount: number): Promise<void> {
        try {
            const html = EmailService.generateWelcomeEmailTemplate(data.email, data.referralCode, data.totalReferrals || 0, totalWaitlistCount);

            await sendEmail(
                data.email,
                "🎉 Welcome to Sambha - You're In!",
                html
            );

            console.log(`Welcome email sent to: ${data.email}`);
        } catch (error) {
            console.error('Failed to send welcome email:', error);
            throw new Error('Failed to send welcome email');
        }
    }

    async sendReferralSuccessEmail(referrerEmail: string, newUserEmail: string, newPoints: number, newRank: number): Promise<void> {
        try {
            const html = EmailService.generateReferralSuccessEmailTemplate(referrerEmail, newUserEmail, newPoints, newRank);

            await sendEmail(
                referrerEmail,
                "🎉 New Referral Success - 10 Points Earned!",
                html
            );

            console.log(`Referral success email sent to: ${referrerEmail}`);
        } catch (error) {
            console.error('Failed to send referral success email:', error);
            // Don't throw here as this is a nice-to-have email
        }
    }
}

export default new EmailService();
