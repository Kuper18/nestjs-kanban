import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Column as ColumnEntity } from 'src/columns/column.entity';
import { Subtask } from 'src/subtasks/subtask.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 250 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  description: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  column: ColumnEntity;

  @OneToMany(() => Subtask, (subtask) => subtask.task)
  subtasks: Subtask[];
}
