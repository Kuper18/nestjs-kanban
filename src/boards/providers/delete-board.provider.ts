import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards.entity';
import { BoardsService } from './boards.service';

@Injectable()
export class DeleteBoardProvider {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService,
  ) {}

  public async delete(boardId: number, userId: number) {
    const board = await this.boardsService.findOneByBoardIdAndUserId(
      boardId,
      userId,
    );

    if (!board) {
      throw new UnauthorizedException();
    }

    try {
      await this.boardsRepository
        .createQueryBuilder()
        .delete()
        .from(Board)
        .where('id = :id', { id: boardId })
        .execute();

      return { message: `Board by ID: '${boardId}' was deleted.` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot delete a board at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
