import { config } from 'dotenv';

config();

const returnNotification = (notification, url) => {
  const html = `<p> ${notification.message} click <a href="${process.env.HOST_NAME}/${url}">here</a> to see the changes
   </p><br><p>Modified date: ${notification.updatedAt}</p> `;

  return html;
};

export default returnNotification;

