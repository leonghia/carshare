import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RidesController } from './rides/rides.controller';

@Module({
  imports: [],
  controllers: [AppController, RidesController],
  providers: [AppService],
})
export class AppModule {}
