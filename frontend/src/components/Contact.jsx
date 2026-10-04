import React, { useState } from 'react';
import SectionBg from './SectionBg';
import MatrixText from './MatrixText';
import { contactData } from '../data/portfolioData';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ loading: false, success: false, error: 'PLEASE COMPLETE ALL REQUIRED FIELDS' });
      return;
    }
    setStatus({ loading: true, success: false, error: '' });
    try {
      const endpoint = import.meta.env.VITE_API_URL || '/api/contact';
      const formattedMessage = [
        form.subject.trim() ? `[SUBJECT: ${form.subject.trim()}]` : null,
        form.phone.trim() ? `[PHONE/COMMS: ${form.phone.trim()}]` : null,
        form.message.trim()
      ].filter(Boolean).join('\n\n');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          phone: form.phone,
          message: formattedMessage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setForm({ name: '', email: '', subject: '', phone: '', message: '' });
        setTimeout(() => setStatus({ loading: false, success: false, error: '' }), 6000);
      } else {
        throw new Error(data.message || data.error || 'TRANSMISSION FAILED');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <section id="contact">
      <SectionBg variant="contact" />
      <div className="section">
        <div className="reveal">
          <div className="section-tag">
            <MatrixText text={contactData.sectionTag} glitchColor="#00ff66" />
          </div>
          <h2 className="section-title">
            GET IN <span><MatrixText text="TOUCH" glitchColor="#00f0ff" /></span>
          </h2>
          <div className="section-id">
            <MatrixText text={contactData.sectionId} glitchColor="#00f0ff" />
          </div>
        </div>

        <div className="terminal-wrap reveal d1" style={{ background: 'rgba(10, 10, 12, 0.92)', borderColor: 'rgba(255, 255, 255, 0.08)', boxShadow: '0 0 60px rgba(255, 255, 255, 0.02)' }}>
          {/* Terminal Header */}
          <div className="terminal-chrome" style={{ background: 'rgba(5, 5, 8, 0.9)', borderBottomColor: 'rgba(255, 255, 255, 0.08)' }}>
            <div className="tc-dot r" /><div className="tc-dot y" /><div className="tc-dot g" />
            <span className="tc-title" style={{ color: 'rgba(255, 255, 255, 0.35)', fontFamily: 'var(--font-mono)' }}>
              <MatrixText text={contactData.terminalPrompt} glitchColor="#00ff66" />
            </span>
          </div>

          <div className="terminal-body">
            {/* Info */}
            <div className="t-info" style={{ borderRightColor: 'rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
                <i className="fas fa-terminal" style={{ color: 'var(--cyan)' }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-hud)', fontSize: '1.2rem' }}>{contactData.title}</h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {contactData.desc}
              </p>
              
              <div className="t-links">
                {contactData.links.map(({ href, icon, key, val }) => (
                  <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="t-link" style={{ borderColor: 'rgba(255, 255, 255, 0.06)', background: 'rgba(10, 10, 12, 0.5)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.background = 'rgba(10, 10, 12, 0.5)'; }}>
                    <div className="t-link-icon" style={{ borderColor: 'rgba(255, 255, 255, 0.15)', color: 'var(--cyan)' }}><i className={icon} /></div>
                    <div>
                      <div className="t-link-key" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{key}</div>
                      <div className="t-link-val" style={{ color: '#fff' }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Responsive Form */}
            <form className="t-form" onSubmit={onSubmit} noValidate>
              <div className="t-form-grid">
                <div className="t-field">
                  <label className="t-label" htmlFor="c-name" style={{ color: 'var(--cyan)' }}>
                    SENDER IDENTIFICATION (NAME) <span aria-hidden="true" style={{ color: '#00ff66' }}>*</span>
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="t-input"
                    placeholder="Enter your name..."
                    required
                    value={form.name}
                    onChange={onChange}
                  />
                </div>
                <div className="t-field">
                  <label className="t-label" htmlFor="c-email" style={{ color: 'var(--cyan)' }}>
                    COMMS WAVEGUIDE (EMAIL) <span aria-hidden="true" style={{ color: '#00ff66' }}>*</span>
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    className="t-input"
                    placeholder="Enter your email address..."
                    required
                    value={form.email}
                    onChange={onChange}
                  />
                </div>
                <div className="t-field">
                  <label className="t-label" htmlFor="c-subject" style={{ color: 'var(--cyan)' }}>
                    TRANSMISSION TOPIC (SUBJECT)
                  </label>
                  <input
                    id="c-subject"
                    type="text"
                    name="subject"
                    autoComplete="off"
                    className="t-input"
                    placeholder="AI Systems / Collaboration / Inquiry"
                    value={form.subject}
                    onChange={onChange}
                  />
                </div>
                <div className="t-field">
                  <label className="t-label" htmlFor="c-phone" style={{ color: 'var(--cyan)' }}>
                    DIRECT TELECOM / FREQUENCY (OPTIONAL)
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    className="t-input"
                    placeholder="+91 / Discord Tag / Phone"
                    value={form.phone}
                    onChange={onChange}
                  />
                </div>
                <div className="t-field t-field-full">
                  <label className="t-label" htmlFor="c-msg" style={{ color: 'var(--cyan)' }}>
                    MESSAGE CARRIER (PACKET DETAILS) <span aria-hidden="true" style={{ color: '#00ff66' }}>*</span>
                  </label>
                  <textarea
                    id="c-msg"
                    name="message"
                    autoComplete="off"
                    className="t-textarea"
                    placeholder="Enter your packet transmission details..."
                    rows={4}
                    required
                    value={form.message}
                    onChange={onChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="t-submit"
                disabled={status.loading}
                id="contact-submit"
                style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--glow-cyan)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {status.loading
                  ? <><i className="fas fa-spinner fa-spin" /> TRANSMITTING PACKETS...</>
                  : <><i className="fas fa-satellite-dish" /> TRANSMIT MESSAGE</>
                }
              </button>
              {status.success && (
                <div className="t-status ok" style={{ fontFamily: 'var(--font-mono)' }}>
                  <i className="fas fa-check-circle" /> TRANSMISSION SUCCESSFUL — STANDING BY
                </div>
              )}
              {status.error && (
                <div className="t-status err" style={{ fontFamily: 'var(--font-mono)' }}>
                  <i className="fas fa-exclamation-triangle" /> {status.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
