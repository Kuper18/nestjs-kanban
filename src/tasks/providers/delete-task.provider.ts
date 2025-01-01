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

@Injectable()
export class DeleteTaskProvider {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  public async delete(taskId: number, userId: number) {
    const task = await this.tasksService.findOneById(taskId);

    if (task.column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this task.',
      );
    }

    try {
      await this.tasksRepository
        .createQueryBuilder()
        .delete()
        .from(Task)
        .where('id = :id', { id: taskId })
        .execute();

      return { message: `Task by ID: '${taskId}' was deleted.` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot delete a task at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
