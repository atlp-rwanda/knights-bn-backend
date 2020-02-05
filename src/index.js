import dotenv from 'dotenv';
import app from './app';

dotenv.config();
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found!',
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`listening on port ${port} ...`); });

export default app;
