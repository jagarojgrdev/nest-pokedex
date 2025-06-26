import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//Decorador para indicar que esto es un esquema de DB
@Schema()
//Tenemos que extenderlo apra que sea un documento de DB
export class Pokemon extends Document {
  //id: string Mongo lo proporciona
  //Decorador para indicar condiciones
  @Prop({
    //Tiene que ser unico
    unique: true,
    //Añade "name" como indice para mejorar la velocidad de consulta
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

//Exportamos el esquma
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
