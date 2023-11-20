import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
import multerConfig from 'src/files/multer-config';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { Public } from 'src/auth/auth.guard';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(
    @Body() createSeriesDto: CreateSeriesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.seriesService.create({
      ...createSeriesDto,
      img: file?.filename,
    });
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(
    @Param('id') id: string,
    @Body() updateSeriesDto: UpdateSeriesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.seriesService.update(+id, {
      ...updateSeriesDto,
      img: file?.filename,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }

  @Public()
  @Get('/files/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './upload/files' });
  }
}
