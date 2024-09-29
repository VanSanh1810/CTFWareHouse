import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Challenge } from './Challenge.entity';
import { Tag } from './Tags.entity';

@Entity()
export class Category extends AbstractEntity<Category> {
  @Column({ unique: true })
  cateName: string;

  @OneToMany(() => Challenge, (chall) => chall.category, { cascade: true })
  challenges: Challenge[];

  @OneToMany(() => Tag, (chall) => chall.category, { cascade: true })
  tags: Tag[];
}
