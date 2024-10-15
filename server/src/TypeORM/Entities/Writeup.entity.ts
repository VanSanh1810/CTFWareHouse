import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Challenge } from './Challenge.entity';

@Entity()
export class Writeup extends AbstractEntity<Writeup> {
  @ManyToOne(() => Challenge, (chall) => chall.writeups)
  challenge: Challenge;

  @Column()
  content: string;

  @Column()
  createDate: Date;

  @Column()
  updateDate: Date;

  @Column({ nullable: true })
  cite: string;
}
