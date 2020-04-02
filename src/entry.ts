import server from './server';
import dotenv from 'dotenv';

dotenv.config();

server.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`);
});
