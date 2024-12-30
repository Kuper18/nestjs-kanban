import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './providers/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { CreateBoardProvider } from './providers/create-board.provider';
import { UpdateBoardProvider } from './providers/update-board.provider';
import { DeleteBoardProvider } from './providers/delete-board.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    CreateBoardProvider,
    UpdateBoardProvider,
    DeleteBoardProvider,
  ],
})
export class BoardsModule {}
