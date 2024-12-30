import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards.entity';
import { CreateBoardDto } from '../dtos/create-board.dto';

@Injectable()
export class CreateBoardProvider {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  public async create({ name }: CreateBoardDto, userId: number) {
    try {
      const { generatedMaps } = await this.boardsRepository
        .createQueryBuilder()
        .insert()
        .into(Board)
        .values({ name, user: { id: userId } })
        .returning(['id', 'name'])
        .execute();

      return generatedMaps[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Faild to create board. Please try again later.',
        { description: error.message || 'Unknown error.' },
      );
    }
  }
}
