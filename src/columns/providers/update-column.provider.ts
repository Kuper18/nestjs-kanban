import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from '../column.entity';
import { ColumnsService } from './columns.service';

@Injectable()
export class UpdateColumnProvider {
  constructor(
    @InjectRepository(Column)
    private readonly conlumsRepository: Repository<Column>,

    @Inject(forwardRef(() => ColumnsService))
    private readonly columnsService: ColumnsService,
  ) {}

  public async update(id: number, name: string, userId: number) {
    const column = await this.columnsService.findOneById(id);

    if (column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this column.',
      );
    }

    try {
      const { raw } = await this.conlumsRepository
        .createQueryBuilder()
        .update(Column)
        .set({ name })
        .where('id = :id', { id })
        .returning(['name', 'id'])
        .execute();

      return raw[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot update a task at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
