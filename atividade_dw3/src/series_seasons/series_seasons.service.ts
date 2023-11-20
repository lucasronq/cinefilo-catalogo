import { Injectable } from '@nestjs/common';
import { CreateSeriesSeasonDto } from './dto/create-series_season.dto';
import { UpdateSeriesSeasonDto } from './dto/update-series_season.dto';

@Injectable()
export class SeriesSeasonsService {
  create(createSeriesSeasonDto: CreateSeriesSeasonDto) {
    return 'This action adds a new seriesSeason';
  }

  findAll() {
    return `This action returns all seriesSeasons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seriesSeason`;
  }

  update(id: number, updateSeriesSeasonDto: UpdateSeriesSeasonDto) {
    return `This action updates a #${id} seriesSeason`;
  }

  remove(id: number) {
    return `This action removes a #${id} seriesSeason`;
  }
}
