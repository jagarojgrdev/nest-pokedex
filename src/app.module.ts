import { join } from 'path'; //Los paquetes que son de node suelen ir al inicio
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
  imports: [
    //Añadimos para hacer uso variables de entorno, tenemos que instalar paquete config
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // Se usa para servir contenido estatico, tenemos que instalar el paquete serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Conexión con Mongo , tenemos que instalar el paquete antes
    MongooseModule.forRoot(
      //NO ES ASÍ YA QUE NO SE DEBE DE CARGAR AQUI LA URL
      process.env.MONGODB || 'mongodb://localhost:27017/pokedex',
    ),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}
