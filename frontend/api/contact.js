const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body safely for serverless environments
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const { name, email, message, subject } = body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const emailUser = process.env.EMAIL_USER || 'roninvolt1@gmail.com';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
  const receiverEmail = process.env.RECEIVER_EMAIL || 'kjvarunkrish@gmail.com, roninvolt1@gmail.com';
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  // Optional: Dispatch to Discord Webhook if configured
  if (discordWebhook && discordWebhook.startsWith('http')) {
    try {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Roninvolt Portfolio Comms',
          avatar_url: 'https://roninvolt.vercel.app/voxen_logo.jpg',
          embeds: [
            {
              title: `📡 Incoming Portfolio Transmission: ${name}`,
              color: 0x00f0ff,
              fields: [
                { name: 'Sender Name', value: String(name), inline: true },
                { name: 'Sender Email', value: String(email), inline: true },
                { name: 'Subject', value: String(subject || 'Portfolio Contact'), inline: false },
                { name: 'Message Packet', value: String(message).substring(0, 1024), inline: false },
              ],
              footer: { text: `roninvolt.vercel.app • ${new Date().toLocaleString()}` },
            },
          ],
        }),
      }).catch(err => console.error('Discord webhook warning:', err.message));
    } catch (e) {
      console.warn('Webhook dispatch failed:', e.message);
    }
  }

  // Check if Gmail SMTP credentials are configured
  if (!emailPass || emailPass === 'your-app-password-here') {
    console.warn(`[Contact API] Message from ${name} (${email}) held: EMAIL_PASS is not configured in Vercel environment variables.`);
    return res.status(503).json({
      success: false,
      error: 'EMAIL_PASS_NOT_CONFIGURED',
      message: 'SMTP credentials missing. Please set EMAIL_PASS in your Vercel Project Environment Variables to forward directly to your Gmail inbox.',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const mailOptions = {
      from: `"Roninvolt Portfolio" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[Portfolio Transmission] Message from ${name}${subject ? ' — ' + subject : ''}`,
      text: `RONINVOLT PORTFOLIO // INCOMING TRANSMISSION\n` +
            `================================================\n\n` +
            `Timestamp : ${new Date().toLocaleString()}\n` +
            `Sender    : ${name}\n` +
            `Email     : ${email}\n` +
            `Subject   : ${subject || 'Portfolio Inquiry'}\n\n` +
            `Message Packet:\n` +
            `------------------------------------------------\n` +
            `${message}\n` +
            `------------------------------------------------\n\n` +
            `Reply directly to this email to contact ${name} at ${email}.`,
      html: `
        <div style="background-color: #050508; color: #ffffff; font-family: 'Courier New', Courier, monospace; padding: 25px; border-radius: 8px; border: 1px solid #22222a; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 1px solid #333340; padding-bottom: 15px; margin-bottom: 20px;">
            <span style="background: #00f0ff; color: #000000; padding: 3px 8px; font-weight: bold; font-size: 11px; letter-spacing: 1px;">RONINVOLT TELEMETRY</span>
            <h2 style="color: #ffffff; margin: 12px 0 0 0; font-size: 20px; font-weight: 700;">Incoming Transmission from ${name}</h2>
            <p style="color: #888899; font-size: 12px; margin: 4px 0 0 0;">Received: ${new Date().toLocaleString()}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #00f0ff; width: 140px; font-weight: bold;">SENDER:</td>
              <td style="padding: 8px 0; color: #ffffff;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #00f0ff; font-weight: bold;">COMMS / EMAIL:</td>
              <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #00f0ff; text-decoration: underline;">${email}</a></td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 8px 0; color: #00f0ff; font-weight: bold;">SUBJECT:</td>
              <td style="padding: 8px 0; color: #ffffff;">${subject}</td>
            </tr>` : ''}
          </table>

          <div style="background: #0c0c12; border: 1px solid #1a1a24; border-left: 3px solid #00f0ff; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <div style="color: #888899; font-size: 11px; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase;">MESSAGE PACKET:</div>
            <div style="color: #f0f0f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </div>

          <div style="border-top: 1px solid #22222a; padding-top: 15px; font-size: 12px; color: #777788; text-align: center;">
            You can reply directly to this email to respond to <strong style="color: #ffffff;">${email}</strong>.<br />
            Forwarded automatically from <a href="https://roninvolt.vercel.app" style="color: #00f0ff; text-decoration: none;">roninvolt.vercel.app</a>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Contact API] Email successfully sent to ${receiverEmail}. Message ID: ${info.messageId}`);
    return res.status(200).json({
      success: true,
      message: 'Transmission successfully delivered to your mail!',
    });
  } catch (error) {
    console.error('[Contact API] Nodemailer error:', error);
    return res.status(500).json({
      success: false,
      error: 'TRANSMISSION_FAILED',
      message: error.message || 'Failed to dispatch email.',
    });
  }
};
