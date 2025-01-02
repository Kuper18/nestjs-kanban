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
import { SubtasksService } from './subtasks.service';

@Injectable()
export class DeleteSubtasksProvider {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,

    @Inject(forwardRef(() => SubtasksService))
    private readonly subtasksService: SubtasksService,
  ) {}

  public async delete(subtaskId: number, userId: number) {
    const subtask = await this.subtasksService.findOneById(subtaskId);

    if (subtask.task.column.board.user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this subtask.',
      );
    }

    try {
      await this.subtasksRepository
        .createQueryBuilder()
        .delete()
        .from(Subtask)
        .where('id = :id', { id: subtaskId })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot delete a substask at the momment. Please try again later.',
        {
          description: error.message || 'Unknown error.',
        },
      );
    }
  }
}
