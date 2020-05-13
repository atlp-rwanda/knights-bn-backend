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
const host = process.env.UI_URL;
export const getPasswordResetURL = (user, token) => `${host}/password/reset?id=${user.id}&&token=${token}`;
export const getEmailVerifytURL = (token) => `${host}/verify/signup/?token=${token}`;
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
export const resetPasswordTemplate = (user, url, message) => {
  const emailBody = generateEmail(
    `${user.lastName}! Welcome to Barefoot Nomad`,
    message,
    'Click here',
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
