import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'src/common/interfaces/mongo-error/mongo-error.interface';

@Injectable()
export class PokemonService {
  //Lo usamos para guardar en la DB
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  //Debe de ser asincrono
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  //TODO LO QUE SEA UN CONEXION A LA BASE DE DATOS DEBE DE SER ASINCRONO
  async findOne(term: string) {
    //Definimos el tipo que va a ser la variable a devolver
    let pokemon: Pokemon | null = null;

    //Buscamos por ID
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //Buscamos por MongoID
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    } else {
      //Buscamos por name
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    //Devolvemos error si no enceuntra nada
    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with identifier "${term}" not found`,
      );
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    if (!updatePokemonDto) {
      throw new BadRequestException('No data provided for update');
    }

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    // Actualizamos objecto completo y hacemos que se machaque el anterior por el nuevo y poder seguir trabajando con los nuevos valores
    // A la hora de deolver los datos, no muestra correctamente lo valores actualizados, para ello se debe de hacer como se realiza
    // await pokemon.updateOne(updatePokemonDto, { new: true });
    try {
      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // Eliminación básica
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon with identifier "${id}" not found`);
    }
    return;
  }

  //Creamos método para excepciones no controladas
  private handleExceptions(error: any) {
    const mongoError = error as MongoError;

    if (mongoError.code === 11000) {
      throw new BadRequestException(
        `Duplicated: ${JSON.stringify(mongoError.keyValue)}`,
      );
    }

    console.log(mongoError);
    throw new InternalServerErrorException('Pokemon error - Check Logs');
  }
}
