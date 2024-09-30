import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Category } from './Category.entity';
import { Tag } from './Tags.entity';

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

  @ManyToMany(() => Tag, (tag) => tag.challenges)
  @JoinTable()
  tags: Tag[];
}
