const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Don't expose server source / config files
app.use((req, res, next) => {
  if (/^\/(server\.js|package(-lock)?\.json|node_modules|\.vscode)(\/|$)/.test(req.path)) {
    return res.status(404).end();
  }
  next();
});

app.use(express.static(__dirname, { index: 'index.html' }));

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: 'All fields are required.' });
  }
  // TODO: send an email (nodemailer) or save to a database here
  console.log('New message:', { name, email, subject, message });
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
