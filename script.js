document.addEventListener('DOMContentLoaded', () => {
  // Email obfuscation — assemble at runtime to deter scrapers
  const emailLink = document.getElementById('email-link');
  const emailText = document.getElementById('email-text');
  const user = 'pengd';
  const domain = 'uchicago.edu';

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const addr = user + '@' + domain;
    emailText.textContent = addr;
    emailLink.href = 'mailto:' + addr;
  });
});
