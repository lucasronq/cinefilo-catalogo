import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { SeriesRepository } from './series.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepository: SeriesRepository,
    private readonly userService: UsersService,
  ) {}

  handleCrateSeasonData(seasons: string) {
    if (seasons) {
      return JSON.parse(seasons as any);
    }
    return [];
  }

  async create(createSeriesDto: CreateSeriesDto) {
    createSeriesDto.seasons = this.handleCrateSeasonData(
      createSeriesDto.seasons as any,
    );
    createSeriesDto.created_by = await this.userService.findById(
      createSeriesDto.created_by as any,
    );
    return this.seriesRepository.createOne(createSeriesDto);
  }

  findAll() {
    return this.seriesRepository.findAll();
  }

  findOne(id: number) {
    return this.seriesRepository.findOne(id);
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    updateSeriesDto.seasons = this.handleCrateSeasonData(
      updateSeriesDto.seasons as any,
    );
    updateSeriesDto.created_by = await this.userService.findById(
      updateSeriesDto.created_by as any,
    );
    console.log(updateSeriesDto);
    return this.seriesRepository.updateOne(id, updateSeriesDto);
  }

  remove(id: number) {
    return this.seriesRepository.removeOne(id);
  }
}
