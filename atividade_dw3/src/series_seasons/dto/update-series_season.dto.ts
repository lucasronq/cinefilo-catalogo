import { PartialType } from '@nestjs/mapped-types';
import { CreateSeriesSeasonDto } from './create-series_season.dto';

export class UpdateSeriesSeasonDto extends PartialType(CreateSeriesSeasonDto) {}
