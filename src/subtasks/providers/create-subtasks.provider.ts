import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subtask } from '../subtask.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManySubtasksDto } from '../dtos/create-many-subtasks.dot';

@Injectable()
export class CreateSubtasksProvider {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,
  ) {}

  public async createMany({ subtasks }: CreateManySubtasksDto) {
    try {
      const { generatedMaps } = await this.subtasksRepository
        .createQueryBuilder()
        .insert()
        .into(Subtask)
        .values(
          subtasks.map(({ taskId, title }) => ({
            title,
            task: { id: taskId },
          })),
        )
        .returning(['title', 'isCompleted', 'taskId'])
        .execute();

      return generatedMaps;
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot create subtasks at the moment. Please try again later.',
        { description: error.message },
      );
    }
  }
}
