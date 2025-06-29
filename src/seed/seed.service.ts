import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  PokeResponse,
  Result,
} from './interfaces/pokeapi-response.interface.ts/pokeapi-response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeedService {
  constructor(private readonly httpService: HttpService) {}

  //Obtenemos peticion http de axios mediante http module: https://docs.nestjs.com/techniques/http-module#http-module
  async executeSeed(): Promise<Result[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=5',
      ),
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      console.log({ name, no });
    });

    return data.results;
  }
}
