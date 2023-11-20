import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { CreateSeriesDto } from './dto/create-series.dto';
import { SeriesSeason } from 'src/series_seasons/entities/series_season.entity';
import { CreateSeriesSeasonDto } from 'src/series_seasons/dto/create-series_season.dto';

@Injectable()
export class SeriesRepository {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
    @InjectRepository(SeriesSeason)
    private readonly seriesSeasonRepository: Repository<SeriesSeason>,
  ) {}

  async findAll(): Promise<Series[]> {
    return this.seriesRepository.find({
      where: {
        is_active: true,
      },
      relations: {
        created_by: true,
        seasons: true,
      },
    });
  }

  async findOne(id: number): Promise<Series> {
    return this.seriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        created_by: true,
        seasons: true,
      },
    });
  }

  async createOne(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const seriesSeasonsToInsert = createSeriesDto.seasons;
    const dataInserted = await this.seriesRepository.save(createSeriesDto);
    await this.seriesSeasonRepository.save(
      seriesSeasonsToInsert.map((val) => ({ ...val, serie: dataInserted })),
    );
    return dataInserted;
  }

  async handleUpdateSerieSeasons(
    updateSerie: Series,
    seriesSeasonsToInsert: CreateSeriesSeasonDto[],
  ) {
    const oldData = await this.findOne(updateSerie.id);
    await this.seriesSeasonRepository.save(
      oldData.seasons
        .filter(
          (season) =>
            !seriesSeasonsToInsert.map((s) => s.id).includes(season.id),
        )
        .map((season) => ({ ...season, is_active: false })),
    );
    return await this.seriesSeasonRepository.save(
      seriesSeasonsToInsert.map((val) => ({ ...val, serie: updateSerie })),
    );
  }

  async updateOne(
    id: number,
    updateSeriesDto: UpdateSeriesDto,
  ): Promise<Series> {
    const updateSerie = await this.seriesRepository.preload({
      id,
      ...updateSeriesDto,
    });
    this.seriesRepository.save(updateSerie);
    await this.handleUpdateSerieSeasons(updateSerie, updateSeriesDto.seasons);
    return updateSerie;
  }

  async removeOne(id: number): Promise<UpdateResult> {
    return this.seriesRepository.update(id, { is_active: false });
  }
}
