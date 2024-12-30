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
import { UpdateBoardDto } from '../dtos/update-board.dto';
import { BoardsService } from './boards.service';

@Injectable()
export class UpdateBoardProvider {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService,
  ) {}

  public async update({ boardId, name }: UpdateBoardDto, userId: number) {
    const board = await this.boardsService.findOneByBoardIdAndUserId(
      boardId,
      userId,
    );

    if (!board) {
      throw new UnauthorizedException();
    }

    try {
      const { raw } = await this.boardsRepository
        .createQueryBuilder()
        .update(Board)
        .set({ name })
        .where('id = :id', { id: boardId })
        .returning(['id', 'name'])
        .execute();

      return raw[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Faild to update board. Please try again later.',
        { description: error.message || 'Unknown error.' },
      );
    }
  }
}
