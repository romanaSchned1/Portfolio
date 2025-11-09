import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get Mailjet credentials from environment variables
    const mailjetApiKey = process.env.MJ_APIKEY_PUBLIC
    const mailjetApiSecret = process.env.MJ_APIKEY_PRIVATE
    const mailjetFromEmail = process.env.MJ_FROM_EMAIL || 'romanaschned@gmail.com'
    const mailjetToEmail = process.env.MJ_TO_EMAIL || 'romanaschned@gmail.com'

    console.log('Mailjet config check:', {
      hasApiKey: !!mailjetApiKey,
      hasApiSecret: !!mailjetApiSecret,
      fromEmail: mailjetFromEmail,
      toEmail: mailjetToEmail
    })

    if (!mailjetApiKey || !mailjetApiSecret) {
      console.error('Mailjet API credentials are not configured')
      console.error('MJ_APIKEY_PUBLIC:', mailjetApiKey ? 'Set' : 'Missing')
      console.error('MJ_APIKEY_PRIVATE:', mailjetApiSecret ? 'Set' : 'Missing')
      return NextResponse.json(
        { error: 'Email service is not configured. Please check your .env.local file and restart the server.' },
        { status: 500 }
      )
    }

    // Prepare Mailjet API request
    const mailjetUrl = 'https://api.mailjet.com/v3.1/send'
    const auth = Buffer.from(`${mailjetApiKey}:${mailjetApiSecret}`).toString('base64')

    const emailBody = {
      Messages: [
        {
          From: {
            Email: email, // Use the email from the form
            Name: name   // Use the name from the form
          },
          To: [
            {
              Email: mailjetToEmail,
              Name: 'Romana Schned'
            }
          ],
          ReplyTo: {
            Email: email, // Set reply-to to the sender's email
            Name: name
          },
          Subject: subject, // Use the subject from the form
          TextPart: message, // Use the message from the form directly
          HTMLPart: `
            <h3>Contact Form Message</h3>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="margin: 1rem 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        }
      ]
    }

    // Send email via Mailjet API
    const response = await fetch(mailjetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailBody)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Mailjet API error:', JSON.stringify(data, null, 2))
      console.error('Response status:', response.status)
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send email. Please try again later.'
      if (data.ErrorMessage) {
        errorMessage = `Mailjet Error: ${data.ErrorMessage}`
      } else if (data.ErrorInfo) {
        errorMessage = `Mailjet Error: ${data.ErrorInfo}`
      }
      
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json(
      { message: 'Email sent successfully', mailjetResponse: data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}

