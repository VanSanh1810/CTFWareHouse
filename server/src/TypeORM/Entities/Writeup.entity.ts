import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Challenge } from './Challenge.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Writeup extends AbstractEntity<Writeup> {
  @Column()
  @MaxLength(50)
  title: string;

  @Column()
  content: string;

  @Column()
  createDate: Date;

  @Column()
  updateDate: Date;

  @Column({ nullable: true })
  cite: string;

  @ManyToOne(() => Challenge, (chall) => chall.writeups)
  challenge: Challenge;
}
