import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':columnId')
  getTasks(
    @Param('columnId') columnId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.tasksService.findManyByColumnId(columnId, userId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put()
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.tasksService.update(updateTaskDto, userId);
  }

  @Delete(':taskId')
  deleteTask(
    @Param('taskId') taskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.tasksService.delete(taskId, userId);
  }
}
