import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from './Category.entity';
import { Tag } from './Tags.entity';

@Entity()
export class Challenge extends AbstractEntity<Challenge> {
  @Column()
  challName: string;

  @ManyToOne(() => Category, (cate) => cate.cateName)
  category: Category;

  @Column({ nullable: true })
  description: string;

  @Column()
  source: string;

  @Column()
  sourceUrl: string;

  @Column({ nullable: true })
  staticFile: string;

  @ManyToMany(() => Tag, (t) => t.challenges)
  @JoinTable()
  tags: Tag[];
}
