import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

type PaisCode = 'BR' | 'US' | 'CA' | 'DE' | 'FR' | 'AR' | 'AT' | 'CH' | 'DK' | 'ES' | 'FI' | 'GL' | 'GT' |
   'HR' | 'IN' | 'IT' | 'IS' | 'JP' | 'LI' |'MC' | 'MX' | 'NL' | 'NO' | 'NZ' | 'PL' |  
   'PT' | 'RU' | 'SE' |'TH' | 'VA' | 'ZA';

@Injectable({
  providedIn: 'root'
})
export class ConsultacepService {

  private readonly APIs: Record<PaisCode, string> = {
    BR: 'https://viacep.com.br/ws/',
    US: 'https://api.zippopotam.us/us/',
    CA: 'https://api.zippopotam.us/ca/',
    DE: 'https://api.zippopotam.us/de/',
    FR: 'https://api.zippopotam.us/fr/',
    AR: 'https://api.zippopotam.us/ar/',
    AT: 'https://api.zippopotam.us/at/',
    CH: 'https://api.zippopotam.us/ch/',
    DK: 'https://api.zippopotam.us/dk/',
    ES: 'https://api.zippopotam.us/es/',
    FI: 'https://api.zippopotam.us/fi/',
    GL: 'https://api.zippopotam.us/gl/',
    GT: 'https://api.zippopotam.us/gt/',
    HR: 'https://api.zippopotam.us/hr/',
    IN: 'https://api.zippopotam.us/in/',
    IT: 'https://api.zippopotam.us/it/',
    IS: 'https://api.zippopotam.us/is/',
    JP: 'https://api.zippopotam.us/jp/',
    LI: 'https://api.zippopotam.us/li/',
    MC: 'https://api.zippopotam.us/mc/',
    MX: 'https://api.zippopotam.us/mx/',
    NL: 'https://api.zippopotam.us/nl/',
    NO: 'https://api.zippopotam.us/no/',
    NZ: 'https://api.zippopotam.us/nz/',
    PL: 'https://api.zippopotam.us/pl/',
    PT: 'https://api.zippopotam.us/pt/',
    RU: 'https://api.zippopotam.us/ru/',
    SE: 'https://api.zippopotam.us/se/',
    TH: 'https://api.zippopotam.us/th/',
    VA: 'https://api.zippopotam.us/va/',
    ZA: 'https://api.zippopotam.us/za/'
    // Adicione mais países conforme necessário
  };

  constructor(private http: HttpClient) {}
 
  private isPaisSuportado(pais: string): pais is PaisCode {
    return pais in this.APIs;
  }

  consultarCep(cep: string, pais: string): Observable<any> {
    if (!this.isPaisSuportado(pais)) {
      return of(null);
    }

    return this.http.get(`${this.APIs[pais]}${cep}`).pipe(
      map(response => this.formatarResposta(response, pais)),
      catchError(() => of(null))
    );
  }

  private formatarResposta(dados: any, pais: PaisCode): any {
    if (pais === 'BR') {
    return {
      logradouro: dados.logradouro || '',
      bairro: dados.bairro || '',
      cidade: dados.localidade || '',
      estado: dados.uf || ''
    };
  }

  return {
    logradouro: dados.places?.[0]['place name'] || '',
    bairro: '',
    cidade: dados.places?.[0]['state'] || '',
    estado: dados.places?.[0]['state abbreviation'] || ''
  };
}

}