import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeriesSeasonsService } from './series_seasons.service';
import { CreateSeriesSeasonDto } from './dto/create-series_season.dto';
import { UpdateSeriesSeasonDto } from './dto/update-series_season.dto';

@Controller('series-seasons')
export class SeriesSeasonsController {
  constructor(private readonly seriesSeasonsService: SeriesSeasonsService) {}

  @Post()
  create(@Body() createSeriesSeasonDto: CreateSeriesSeasonDto) {
    return this.seriesSeasonsService.create(createSeriesSeasonDto);
  }

  @Get()
  findAll() {
    return this.seriesSeasonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesSeasonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesSeasonDto: UpdateSeriesSeasonDto) {
    return this.seriesSeasonsService.update(+id, updateSeriesSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesSeasonsService.remove(+id);
  }
}
