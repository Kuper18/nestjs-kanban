import { Exclude } from 'class-transformer';
import { Board } from 'src/boards/boards.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 1024 })
  @Exclude()
  password: string;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
