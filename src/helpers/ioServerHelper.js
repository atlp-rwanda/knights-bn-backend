import socketIo from 'socket.io';
import express from 'express';

const port = process.env.PORT || 4000;
export const app = express();
const server = app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});

export default socketIo(server);
