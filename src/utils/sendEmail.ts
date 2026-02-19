import nodemailer from 'nodemailer'

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'pnufwo32qetfd5zm@ethereal.email',
      pass: process.env.SMTP_PASS || 'yfT14tWdXYcN6jnpnS'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"TheTapHoa" <noreply@thetaphoa.vercel.app>',
    to,
    subject,
    html
  })

  console.log('Message sent: %s', info.messageId)

  // Preview URL only available with Ethereal
  const previewUrl = nodemailer.getTestMessageUrl(info)
  if (previewUrl) {
    console.log('Preview URL: %s', previewUrl)
  }

  return info
}
