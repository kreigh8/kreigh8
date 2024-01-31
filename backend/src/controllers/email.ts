import { NextFunction, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer-smtp-transport'

export const sendContactEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { name, email, message } = req.body

    console.log(req.body)

    const transport = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      },
      secure: true,
      logger: true,
      debug: true,
    } as SMTPTransport.SmtpOptions)

    let emailConfig = {
      from: `${process.env.SMTP_USERNAME}`,
      replyTo: `"${name}" <${email}>`, // sender address
      to: `${process.env.SMTP_USERNAME}`, // list of receivers
      subject: "kreigh8 Contact Form Email: ✔", // Subject line
      html: `<h3>Hello Kreigh,</h3>
      <p>${message}</p>`, // html body
    }

    transport.sendMail(emailConfig, function (err, info) {
      if (err) {
        console.log(err)
        next(err)
      } else {
        return res.status(201)
        .json({ 
          msg: "you should receive an email",
          info : info.messageId,
        })
      }
    })
  } catch (error) {
    next(error)
  }
}