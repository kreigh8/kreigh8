export async function verifyRecaptcha(token: string) {
  const secretKey = process.env.GOOGLE_CAPTCHA_KEY

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: 'POST'
      }
    )
    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}
