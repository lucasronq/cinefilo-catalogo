import { Module } from '@nestjs/common';
import { SeriesSeasonsService } from './series_seasons.service';
import { SeriesSeasonsController } from './series_seasons.controller';

@Module({
  controllers: [SeriesSeasonsController],
  providers: [SeriesSeasonsService],
})
export class SeriesSeasonsModule {}
