import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class UpdateTaskProvider {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  public async update(
    { taskId, columnId, title, description }: UpdateTaskDto,
    userId: number,
  ) {
    const task = await this.tasksService.findOneById(taskId);

    if (task.column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this task.',
      );
    }

    try {
      const { raw } = await this.tasksRepository
        .createQueryBuilder()
        .update(Task)
        .set({ title, description, column: { id: columnId } })
        .where('id = :id', { id: taskId })
        .returning(['title', 'description', 'columnId', 'id'])
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
