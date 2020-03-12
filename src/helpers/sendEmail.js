import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const sendEmail = async (businessEmail, requester, request) => {
  const url = `${process.env.HOST_NAME}/api/v1/trips/request/${request.id}`;
  sendGrid.setApiKey(process.env.BN_API_KEY);
  const msg = {
    to: `${requester.email}`,
    from: `${businessEmail}`,
    subject: 'Request approved!',
    text: `${request.reason}`,
    html: `<div>
            <strong>Dear ${requester.firstName},<strong><br><br>
            <p>This is to inform you that your trip request has been approved.<p>
            <strong>Open this <a href="${url}">link</a> to view request details.</strong>
            <br><br>Barefoot Nomad Team<br>
            <br>Thank you<br>
           </div>`,
  };
  sendGrid.send(msg);
};
export default sendEmail;
