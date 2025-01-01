import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Column } from '../column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColumnDto } from '../dtos/create-column.dto';
import { DeleteColumnProvider } from './delete-column.provider';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnsRepository: Repository<Column>,

    private readonly deleteColumnProvider: DeleteColumnProvider,
  ) {}

  public async findOneById(columnId: number) {
    try {
      return await this.columnsRepository.findOne({
        where: { id: columnId },
        relations: ['board', 'board.user'],
      });
    } catch (error) {
      throw new NotFoundException(`Column with ID ${columnId} not found.`, {
        description: error.message,
      });
    }
  }

  public async findMany(boardId: number) {
    try {
      return await this.columnsRepository.find({
        where: { board: { id: boardId } },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot fetch columns at the moment. Please try again later.',
        { description: error.message },
      );
    }
  }

  public async create({ boardId, name }: CreateColumnDto) {
    try {
      const { generatedMaps } = await this.columnsRepository
        .createQueryBuilder()
        .insert()
        .into(Column)
        .values({ name, board: { id: boardId } })
        .returning(['id', 'name'])
        .execute();

      return generatedMaps[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot create column at the moment. Please try again later.',
        { description: error.message },
      );
    }
  }

  public async delete(columnId: number, userId: number) {
    return await this.deleteColumnProvider.delete(columnId, userId);
  }
}
