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
export class DeleteColumnProvider {
  constructor(
    @InjectRepository(Column)
    private readonly conlumsRepository: Repository<Column>,

    @Inject(forwardRef(() => ColumnsService))
    private readonly columnsService: ColumnsService,
  ) {}

  public async delete(columnId: number, userId: number) {
    const column = await this.columnsService.findOneById(columnId);

    if (column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this column.',
      );
    }

    try {
      await this.conlumsRepository
        .createQueryBuilder()
        .delete()
        .from(Column)
        .where('id = :id', { id: columnId })
        .execute();

      return 'Deleted.';
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot delete a column at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
