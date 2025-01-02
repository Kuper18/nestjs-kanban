import { Task } from 'src/tasks/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 125 })
  title: string;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;
}
