import { CreateSeriesSeasonDto } from "src/series_seasons/dto/create-series_season.dto";
import { User } from "src/users/entities/user.entity";

export class CreateSeriesDto {
    name: string;
    rated: number;
    genre: string;
    description: string;
    created_by: User;
    img?: string;
    seasons?: CreateSeriesSeasonDto[];
}
