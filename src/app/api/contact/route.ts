import { verifyRecaptcha } from '@/lib/recaptcha'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(req: NextRequest) {
  console.log('request', req)
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'This route does not exist' },
      { status: 405 }
    )
  }

  console.log('req', req)

  const { name, email, message, recaptchaToken } = await req.json()

  try {
    if (process.env.NODE_ENV === 'production') {
      const recaptchaSuccess = await verifyRecaptcha(recaptchaToken)
      if (!recaptchaSuccess) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed.' },
          { status: 409 }
        )
      }
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAIL_EMAIL,
        pass: process.env.NODEMAIL_PASS
      }
    })

    const mailOptions: Mail.Options = {
      from: process.env.NODEMAIL_EMAIL,
      to: 'khirschy@kreigh8.com',
      subject: `Message from ${name} (${email})`,
      text: message
    }

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve('Email sent')
          } else {
            reject(err.message)
          }
        })
      })

    await sendMailPromise()
    return NextResponse.json({ message: 'Message received!' }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { message: 'Failed to send message.' },
      { status: 500 }
    )
  }
}
