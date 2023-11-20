import { General } from 'src/general.entity';
import { SeriesSeason } from 'src/series_seasons/entities/series_season.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Series extends General {
  @Column()
  name: string;

  @Column()
  rated: number;

  @Column()
  genre: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => User, (user) => user.id)
  created_by: User;

  @OneToMany(() => SeriesSeason, (season) => season.serie)
  seasons: SeriesSeason[];
}
