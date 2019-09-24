import express from 'express';
import { RequestModel } from './models/request.model';

const server = express();

server.get('/', (_, res) => {
  res.send(new RequestModel('Thiago', 25));
});

export default server;
