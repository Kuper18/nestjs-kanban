import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Column as ColumnEntity } from 'src/columns/column.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 250 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  description: string;

  @ManyToMany(() => ColumnEntity, (column) => column.tasks)
  @JoinColumn()
  column: ColumnEntity;
}
