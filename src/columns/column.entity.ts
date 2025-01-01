import { Board } from 'src/boards/boards.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnORM,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnORM({ type: 'varchar', nullable: false, length: 60 })
  name: string;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn()
  board: Board;
}
