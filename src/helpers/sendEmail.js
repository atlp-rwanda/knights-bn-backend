import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const sendEmail = async (businessEmail, requester, request, subject, title) => {
  const url = `${process.env.HOST_NAME === 'localhost:4000' ? 'http://' : 'https://'}${process.env.HOST_NAME}/api/v1/trips/request/${request.id}`;
  sendGrid.setApiKey(process.env.BN_API_KEY);
  const msg = {
    to: `${requester.email}`,
    from: `${businessEmail}`,
    subject: `${subject}`,
    text: `${request.reason}`,
    html: `<div>
            <strong>Dear ${requester.firstName},<strong><br><br>
            <p>${title}<p>
            Open this <a href="${url}">link</a> to view request details.
            <br><br>Barefoot Nomad Team<br>
            <br>Thank you<br>
           </div>`,
  };
  sendGrid.send(msg);
};
export default sendEmail;
