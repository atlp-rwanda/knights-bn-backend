import { config } from 'dotenv';

config();
export default (notification, url) => {
  const html = `<p> ${notification.message} click <a href="${process.env.HOST_NAME}/${url}">here</a> to see the changes
   </p><br><p>Modified date: ${notification.updatedAt}</p> `;

  return html;
};
