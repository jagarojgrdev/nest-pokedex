import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/pokeapi-response.interface.ts/pokeapi-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

// Habría que realizar algunas validaciones como que solo pueda ejecutarse en desarrollo, según rol, DB vacia...

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  //INSERTAR REGISTROS 1 A 1
  // //Llamamos desde adaptador de Axios
  // async executeSeed() {
  //   const data = await this.http.get<PokeResponse>(
  //     'https://pokeapi.co/api/v2/pokemon?limit=5',
  //   );
  //   for (const { name, url } of data.results) {
  //     const segments = url.split('/');
  //     const no = +segments[segments.length - 2];
  //     await this.pokemonModel.create({ name, no });
  //   }

  //   return 'Seed executed';
  // }

  //INSERTAR REGISTROS SIMULTANEAMENTE
  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no }); // [{ name: bulbasaur, no: 1 }]
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
