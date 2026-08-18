// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form → Discord webhook
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1539400415756681260/jSBtUg3gN3lm4J86dHI7UOoJkWw1VhZ2-qR5GJBsqwvWKXo8e0pYKTzOnx_wQPzy64ng';

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const [name, email, phone, service, message] = [
    form.querySelector('input[type=text]').value,
    form.querySelector('input[type=email]').value,
    form.querySelector('input[type=tel]').value,
    form.querySelector('select').value,
    form.querySelector('textarea').value
  ];

  const body = {
    username: 'Recovering the 417 — Contact Form',
    embeds: [{
      title: '📬 New Contact Form Submission',
      color: 0xf28713,
      fields: [
        { name: '👤 Name',    value: name,              inline: true },
        { name: '📧 Email',   value: email,             inline: true },
        { name: '📞 Phone',   value: phone || 'N/A',    inline: true },
        { name: '🛠️ Service', value: service || 'N/A',  inline: true },
        { name: '💬 Message', value: message }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  const btn = form.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error();
    document.getElementById('form-success').style.display = 'block';
    form.reset();
  } catch {
    alert('Something went wrong. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
}
