import sgMail from '@sendgrid/mail';
import mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

const template = new mailgen({
  theme: 'salted',
  product: {
    name: 'Barefoot Nomad',
    link: '#',
  },
});

sgMail.setApiKey(process.env.BN_API_KEY);
let host;
if (process.env.NODE_ENV === 'development') {
  host = process.env.LOCAL_HOST;
} else {
  host = process.env.HOST_NAME;
}

export const getPasswordResetURL = (user, token) => `${host}/api/v1/password/reset/${user.id}/${token}`;

const generateEmail = (name, instructions, buttonTxt, link) => ({
  body: {
    name,
    action: {
      instructions,
      button: {
        color: '#87ceeb',
        text: buttonTxt,
        link,
      },
    },
    outro: 'Your friends at Barefoot.',
  },
});
export const resetPasswordTemplate = (user, url) => {
  const emailBody = generateEmail(
    `${user.lastName}! Welcome to Barefoot Nomad`,
    `
    We heard that you lost your Barefoot password. Sorry about that!
    But don’t worry! You can use the following link to reset your password:
    If you don’t use this link within 1 hour, it will expire.
    have a Good day! 
    `,
    'Verify account',
    `${url}`,
  );
  const emailTemplate = template.generate(emailBody);

  const msg = {
    to: user.email,
    from: 'no-reply@barefootnomad.com',
    subject: 'Verify Your Email',
    html: emailTemplate,
  };
  sgMail.send(msg);
};
