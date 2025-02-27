import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideController } from './modules/ride/ride.controller';
import { RideModule } from './modules/ride/ride.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [RideModule, DatabaseModule],
  controllers: [AppController, RideController],
  providers: [AppService],
})
export class AppModule {}
