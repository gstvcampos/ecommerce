import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/verificacao?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Confirme seu email',
    html: `<p>Click <a href="${confirmLink}'>here</a> para verificar seu email</p>`,
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/auth/nova-senha?token=${token}`

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Confirme seu email',
    html: `<p>Click <a href="${resetLink}'>here</a> criar nova senha</p>`,
  })
}
