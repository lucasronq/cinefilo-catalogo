import { General } from 'src/general.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends General {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
