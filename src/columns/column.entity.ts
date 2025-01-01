import { Board } from 'src/boards/boards.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnORM,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnORM({ type: 'varchar', nullable: false, length: 60 })
  name: string;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn()
  board: Board;
}
