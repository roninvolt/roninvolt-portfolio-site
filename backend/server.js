const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Global Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] 🔍 ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.get('/api/health', (req, res) => {
    const isEmailConfigured = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    res.status(200).json({
        status: 'up',
        time: new Date().toISOString(),
        emailServiceConfigured: isEmailConfigured
    });
});

// Configure Nodemailer Transporter
const getTransporter = () => {
    const emailUser = process.env.EMAIL_USER || 'roninvolt1@gmail.com';
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000
    });
};

// Check email configuration on startup
const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
if (!emailPass || emailPass === 'your-app-password') {
    console.log('⚠️ [Notice] EMAIL_PASS is not configured in backend .env. Set EMAIL_USER & EMAIL_PASS to send emails.');
} else {
    const transporter = getTransporter();
    transporter.verify((error) => {
        if (error) {
            console.error('❌ Email Transporter Verification Error:', error.message);
        } else {
            console.log('✅ Email Transporter verified and ready to dispatch to inbox');
        }
    });
}

// Main Contact Endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message, subject } = req.body || {};
    const requestId = Math.random().toString(36).substring(7).toUpperCase();

    console.log(`\n[${requestId}] 📨 Incoming contact transmission from ${name} (${email})`);

    if (!name || !email || !message) {
        console.warn(`[${requestId}] ⚠️ Validation failed: Missing required fields`);
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const emailUser = process.env.EMAIL_USER || 'roninvolt1@gmail.com';
    const emailPassCurrent = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'kjvarunkrish@gmail.com, roninvolt1@gmail.com';
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    // Optional Discord webhook dispatch
    if (discordWebhook && discordWebhook.startsWith('http')) {
        try {
            await fetch(discordWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'Roninvolt Portfolio Comms',
                    avatar_url: 'https://roninvolt.vercel.app/voxen_logo.jpg',
                    embeds: [{
                        title: `📡 Incoming Portfolio Transmission: ${name}`,
                        color: 0x00f0ff,
                        fields: [
                            { name: 'Sender Name', value: String(name), inline: true },
                            { name: 'Sender Email', value: String(email), inline: true },
                            { name: 'Subject', value: String(subject || 'Portfolio Contact'), inline: false },
                            { name: 'Message Packet', value: String(message).substring(0, 1024), inline: false },
                        ],
                        footer: { text: `Request ${requestId} • ${new Date().toLocaleString()}` },
                    }],
                }),
            }).catch(err => console.error('Discord webhook warning:', err.message));
        } catch (e) {}
    }

    if (!emailPassCurrent || emailPassCurrent === 'your-app-password') {
        console.warn(`[${requestId}] ❌ EMAIL_PASS missing in environment.`);
        return res.status(503).json({
            success: false,
            error: 'EMAIL_PASS_MISSING',
            message: 'Email service credentials not configured. Please set EMAIL_USER & EMAIL_PASS in your environment.'
        });
    }

    try {
        const transporter = getTransporter();
        const mailOptions = {
            from: `"Roninvolt Portfolio" <${emailUser}>`,
            to: receiverEmail,
            replyTo: email,
            subject: `[Portfolio Transmission] Message from ${name}${subject ? ' — ' + subject : ''}`,
            text: `Request ID : ${requestId}\n` +
                  `Timestamp  : ${new Date().toLocaleString()}\n` +
                  `Sender     : ${name}\n` +
                  `Email      : ${email}\n` +
                  `Subject    : ${subject || 'Portfolio Inquiry'}\n\n` +
                  `Message:\n${message}\n`,
            html: `
              <div style="background-color: #050508; color: #ffffff; font-family: 'Courier New', Courier, monospace; padding: 25px; border-radius: 8px; border: 1px solid #22222a; max-width: 600px; margin: 0 auto;">
                <div style="border-bottom: 1px solid #333340; padding-bottom: 15px; margin-bottom: 20px;">
                  <span style="background: #00f0ff; color: #000000; padding: 3px 8px; font-weight: bold; font-size: 11px;">TELEMETRY [${requestId}]</span>
                  <h2 style="color: #ffffff; margin: 12px 0 0 0; font-size: 20px;">Incoming Transmission from ${name}</h2>
                  <p style="color: #888899; font-size: 12px; margin: 4px 0 0 0;">Received: ${new Date().toLocaleString()}</p>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                  <tr><td style="padding: 8px 0; color: #00f0ff; width: 140px; font-weight: bold;">SENDER:</td><td style="padding: 8px 0; color: #ffffff;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #00f0ff; font-weight: bold;">COMMS / EMAIL:</td><td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #00f0ff;">${email}</a></td></tr>
                  ${subject ? `<tr><td style="padding: 8px 0; color: #00f0ff; font-weight: bold;">SUBJECT:</td><td style="padding: 8px 0; color: #ffffff;">${subject}</td></tr>` : ''}
                </table>
                <div style="background: #0c0c12; border: 1px solid #1a1a24; border-left: 3px solid #00f0ff; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                  <div style="color: #888899; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;">MESSAGE PACKET:</div>
                  <div style="color: #f0f0f5; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                </div>
                <div style="border-top: 1px solid #22222a; padding-top: 15px; font-size: 12px; color: #777788; text-align: center;">
                  Reply directly to this email to respond to <strong style="color: #ffffff;">${email}</strong>.
                </div>
              </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[${requestId}] ✅ Email sent successfully! Message ID: ${info.messageId}`);
        res.status(200).json({ success: true, message: 'Message sent and forwarded to your email!' });
    } catch (error) {
        console.error(`[${requestId}] ❌ Error sending email:`, error.message);
        res.status(500).json({ success: false, error: 'TRANSMISSION_FAILED', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend API Server running on http://localhost:${PORT}`);
});
