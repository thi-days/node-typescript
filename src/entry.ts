import server from './server';

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});