import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubtasksProvider } from './create-subtasks.provider';
import { CreateManySubtasksDto } from '../dtos/create-many-subtasks.dot';
import { UpdateSubtaskDto } from '../dtos/update-subtask.dto';
import { UpdateSubtasksProvider } from './update-subtasks.provider';
import { Repository } from 'typeorm';
import { Subtask } from '../subtask.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteSubtasksProvider } from './delete-subtasks.provider';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
    private readonly createSubtasksProvider: CreateSubtasksProvider,
    private readonly updateSubtasksProvider: UpdateSubtasksProvider,
    private readonly deleteSubtasksProvider: DeleteSubtasksProvider,
  ) {}

  public async findOneById(subtaskId: number) {
    try {
      return await this.subtaskRepository.findOne({
        where: { id: subtaskId },
        relations: [
          'task',
          'task.column',
          'task.column.board',
          'task.column.board.user',
        ],
      });
    } catch (error) {
      throw new NotFoundException(`Subtask with ID ${subtaskId} not found.`, {
        description: error.message,
      });
    }
  }

  public async findMany(taskId: number, userId: number) {
    try {
      return await this.subtaskRepository.find({
        where: {
          task: { id: taskId, column: { board: { user: { id: userId } } } },
        },
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

  public async createMany(createManySubtasksDto: CreateManySubtasksDto) {
    return await this.createSubtasksProvider.createMany(createManySubtasksDto);
  }

  public async update(updateSubtaskDto: UpdateSubtaskDto, userId: number) {
    return await this.updateSubtasksProvider.update(updateSubtaskDto, userId);
  }

  public async delete(subtaskId: number, userId: number) {
    return await this.deleteSubtasksProvider.delete(subtaskId, userId);
  }
}
