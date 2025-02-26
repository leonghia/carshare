import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideController } from './modules/ride/ride.controller';

@Module({
  imports: [],
  controllers: [AppController, RideController],
  providers: [AppService],
})
export class AppModule {}
