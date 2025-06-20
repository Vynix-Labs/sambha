import { Resend } from 'resend'
import env from '@/lib/config/env'

const resend = new Resend(env.RESEND_API_KEY)

async function sendEmail(to: string, subject: string, html: string) {
    try {
        const response = await resend.emails.send({
            from: env.EMAIL_FROM,
            to,
            subject,
            html,
        })
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default sendEmail
