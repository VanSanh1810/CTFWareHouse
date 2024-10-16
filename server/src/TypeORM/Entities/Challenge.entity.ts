import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './Category.entity';
import { Tag } from './Tags.entity';
import { Writeup } from './Writeup.entity';

@Entity()
export class Challenge extends AbstractEntity<Challenge> {
  @Column()
  challName: string;

  @ManyToOne(() => Category, (cate) => cate.challenges)
  category: Category;

  @Column({ nullable: true })
  description: string;

  // for ctf platform
  @Column()
  source: string;
  @Column()
  sourceUrl: string;

  // for static project files
  @Column({ nullable: true })
  staticFileUrl: string;
  @Column({ nullable: true })
  staticFileName: string;

  @ManyToMany(() => Tag, (tag) => tag.challenges, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Writeup, (writeup) => writeup.challenge)
  writeups?: Writeup[];
}
