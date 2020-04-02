import express, { Request, Response } from 'express';
import { ViaCepController } from './controller/via-cep.controller';
import { ViaCepAddress } from './models/via-cep-address.model';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  response.setHeader('Content-Type', 'text/plain');
  response.send('Hello World! \nMake a POST to "/get-address?cep=<your_cep_here>" to see it working! =)');
});

app.get('/get-address', (request: Request, response: Response) => {
  if (request.query && request.query.cep) {
    ViaCepController
      .getAddress(request.query.cep)
      ?.then((viaCepAddress: ViaCepAddress) => {
        response.json(viaCepAddress);
      })
      .catch((err) => {
        response.status(500).json(err);
      });
  }
});

export default app;
