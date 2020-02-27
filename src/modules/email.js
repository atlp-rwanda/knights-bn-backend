import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.BN_API_KEY);
export const getPasswordResetURL = (user, token) => `${process.env.HOST_NAME}/api/v1/password/reset/${user.id}/${token}`;

export const resetPasswordTemplate = (user, url) => {
  const msg = {
    to: user.email,
    from: 'no-reply@barefootnomad.com',
    subject: 'Verify Your Email',
    html: `
    <p>Hey ${user.lastName || user.email},</p>
    <p>We heard that you lost your Barefoot password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>have a Good day! </p>
    <p>–Your friends at Barefoot.</p>
    `,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};
