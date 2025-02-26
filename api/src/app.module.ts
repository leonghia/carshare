import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RidesController } from './rides/rides.controller';
import { PlacesController } from './places/places.controller';

@Module({
  imports: [],
  controllers: [AppController, RidesController, PlacesController],
  providers: [AppService],
})
export class AppModule {}
