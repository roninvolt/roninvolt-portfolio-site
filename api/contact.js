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

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const user = process.env.EMAIL_USER || 'roninvolt1@gmail.com';
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
  const receiver = process.env.RECEIVER_EMAIL || 'roninvolt1@gmail.com';

  if (!pass || pass === 'your-app-password-here') {
    console.log(`[Vercel Demo Mode] Contact packet received from ${name} (${email}): ${message}`);
    return res.status(200).json({
      success: true,
      message: 'Transmission received! (Configure EMAIL_PASS in Vercel to forward to Gmail)',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: receiver,
      subject: `[Portfolio] Transmission from ${name}`,
      text: `Date: ${new Date().toLocaleString()}\n\nSender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message transmitted successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
