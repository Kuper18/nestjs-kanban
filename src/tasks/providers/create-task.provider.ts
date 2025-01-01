import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TasksService } from './tasks.service';

@Injectable()
export class CreateTaskProvider {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  public async create({ columnId, title, description }: CreateTaskDto) {
    try {
      const { generatedMaps } = await this.tasksRepository
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values({ title, description, column: { id: columnId } })
        .returning(['title', 'description', 'columnId'])
        .execute();

      return generatedMaps[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot create column at the moment. Please try again later.',
        { description: error.message },
      );
    }
  }
}
