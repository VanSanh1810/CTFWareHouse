import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Challenge } from './Challenge.entity';
import { Category } from './Category.entity';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  @Column({ unique: true })
  tagName: string;

  @ManyToMany(() => Challenge, (chall) => chall.tags)
  challenges: Challenge[];

  @ManyToOne(() => Category, (cate) => cate.tags)
  category: Category;
}
