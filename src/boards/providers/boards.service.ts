import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards.entity';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { CreateBoardProvider } from './create-board.provider';
import { UpdateBoardDto } from '../dtos/update-board.dto';
import { UpdateBoardProvider } from './update-board.provider';
import { DeleteBoardProvider } from './delete-board.provider';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,

    private readonly createBoardProvider: CreateBoardProvider,
    private readonly updateBoardProvider: UpdateBoardProvider,
    private readonly deleteBoardProvider: DeleteBoardProvider,
  ) {}

  public async getAll(userId: number) {
    try {
      return await this.boardsRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Faild to fetch boards. Please try again later.',
        { description: error.message || 'Unknown error.' },
      );
    }
  }

  public async findOneByBoardIdAndUserId(boardId: number, userId: number) {
    try {
      return await this.boardsRepository.findOne({
        where: { id: boardId, user: { id: userId } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Unexpected error. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }

  public async create(createBoardDto: CreateBoardDto, userId: number) {
    return await this.createBoardProvider.create(createBoardDto, userId);
  }

  public async update(updateBoardDto: UpdateBoardDto, userId: number) {
    return await this.updateBoardProvider.update(updateBoardDto, userId);
  }

  public async delete(boardId: number, userId: number) {
    return await this.deleteBoardProvider.delete(boardId, userId);
  }
}
