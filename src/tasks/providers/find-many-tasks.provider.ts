import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { ColumnsService } from 'src/columns/providers/columns.service';

@Injectable()
export class FindManyTasksProvider {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    private readonly columnsService: ColumnsService,
  ) {}

  public async findMany(
    columnId: number,
    userId: number,
    populate: 'subtasks',
  ) {
    const column = await this.columnsService.findOneById(columnId);

    if (column.board.user.id !== userId) {
      throw new ForbiddenException(
        `You do not have permission to get the tasks by this column ID ${columnId}.`,
      );
    }

    try {
      return await this.tasksRepository.find({
        where: { column: { id: columnId } },
        relations: populate === 'subtasks' ? ['subtasks'] : undefined,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot fetch tasks at the moment. Please try again later.',
        { description: error.message },
      );
    }
  }
}
