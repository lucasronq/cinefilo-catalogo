import { General } from 'src/general.entity';
import { Series } from 'src/series/entities/series.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SeriesSeason extends General {
  @ManyToOne(() => Series, (series) => series.seasons)
  serie: Series;

  @Column()
  number_of_episodes: number;
}
