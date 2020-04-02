import { ViaCepAddress } from '../models/via-cep-address.model';
import https from 'https';
import { IncomingMessage } from 'http';

export class ViaCepController {
  private static getViaCepUrl(cep: string): string {
    return `https://viacep.com.br/ws/${cep}/json/unicode/`;
  }

  public static getAddress(cep: string): Promise<ViaCepAddress> {
    return new Promise<ViaCepAddress>((resolve, reject) => {
      if (this.isValidCep(cep)) {
        https.get(this.getViaCepUrl(cep), (response: IncomingMessage) => {
          let body = '';
          response.on('data', data => body += data);
          response.on('end', () => resolve(JSON.parse(body)));
          response.on('error', (err: Error) => reject(err));
        });
      } else {
        reject({
          message: "Invalid CEP format"
        });
      }
    });
  }

  public static isValidCep(cep: string): boolean {
    return /^[0-9]{8}/.test(cep) || /^[0-9]{5}-[0-9]{3}/.test(cep);
  }
}
