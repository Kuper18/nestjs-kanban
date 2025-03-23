import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from '../subtask.entity';
import { UpdateSubtaskDto } from '../dtos/update-subtask.dto';
import { SubtasksService } from './subtasks.service';

@Injectable()
export class UpdateSubtasksProvider {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,

    @Inject(forwardRef(() => SubtasksService))
    private readonly subtasksService: SubtasksService,
  ) {}

  public async update(
    { isCompleted, title, subtaskId }: UpdateSubtaskDto,
    userId: number,
  ) {
    const subtask = await this.subtasksService.findOneById(subtaskId);

    if (subtask.task.column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this subtask.',
      );
    }

    try {
      const { raw } = await this.subtasksRepository
        .createQueryBuilder()
        .update(Subtask)
        .set({
          title: title || subtask.title,
          isCompleted: isCompleted ?? subtask.isCompleted,
        })
        .where('id = :id', { id: subtaskId })
        .returning(['title', 'isCompleted', 'taskId', 'id'])
        .execute();

      return raw[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot update a subtask at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
