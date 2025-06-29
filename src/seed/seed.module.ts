import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    //Integramos Http module y configuramos para que sea asincrono
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
