import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { CreateTaskProvider } from './create-task.provider';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { UpdateTaskProvider } from './update-task.provider';
import { DeleteTaskProvider } from './delete-task.provider';
import { FindManyTasksProvider } from './find-many-tasks.provider';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly createTaskProvider: CreateTaskProvider,
    private readonly updateTaskProvider: UpdateTaskProvider,
    private readonly deleteTaskProvider: DeleteTaskProvider,
    private readonly findManyTasksProvider: FindManyTasksProvider,
  ) {}

  public async findOneById(taskId: number) {
    try {
      return await this.tasksRepository.findOne({
        where: { id: taskId },
        relations: ['column', 'column.board', 'board.user'],
      });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`, {
        description: error.message,
      });
    }
  }

  public async findManyByColumnId(columnId: number, userId: number) {
    return await this.findManyTasksProvider.findMany(columnId, userId);
  }

  public async create(createTaskDto: CreateTaskDto) {
    return await this.createTaskProvider.create(createTaskDto);
  }

  public async update(updateTaskDto: UpdateTaskDto, userId: number) {
    return await this.updateTaskProvider.update(updateTaskDto, userId);
  }

  public async delete(taskId: number, userId: number) {
    return await this.deleteTaskProvider.delete(taskId, userId);
  }
}
