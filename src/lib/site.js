import data from '../data/portfolio.json';

// Prefilled mailto link used by Navbar, Hero, Contact, and Footer
export const buildMailto = () =>
  `mailto:${data.personalInfo.email}?subject=${encodeURIComponent(
    data.contactMail.subject
  )}&body=${encodeURIComponent(data.contactMail.body)}`;

// Gmail web compose with the same prefill. Unlike mailto:, this always
// navigates somewhere visible, even on machines with no mail app configured.
export const buildGmailCompose = () =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    data.personalInfo.email
  )}&su=${encodeURIComponent(data.contactMail.subject)}&body=${encodeURIComponent(
    data.contactMail.body
  )}`;

export default data;
