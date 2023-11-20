import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { SeriesSeason } from 'src/series_seasons/entities/series_season.entity';
import { SeriesRepository } from './series.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Series, SeriesSeason]), UsersModule],
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository],
})
export class SeriesModule {}
