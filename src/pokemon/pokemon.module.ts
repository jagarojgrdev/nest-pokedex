import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  //Hacemos la conexión con la entidad
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        //Llamamos a la entidad y al esquema
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  //Exportamos para llamar desde SEED
  exports: [MongooseModule],
})
export class PokemonModule {}
