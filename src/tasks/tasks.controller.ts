import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './providers/tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import tasksSwaggerDto from './tasks-swagger.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse(tasksSwaggerDto.getResponse)
  @ApiParam({ type: Number, name: 'columnId', schema: { example: 1 } })
  @ApiQuery({
    name: 'populate',
    required: false,
    type: String,
    example: 'subtasks',
  })
  @Get(':columnId')
  getTasks(
    @Param('columnId') columnId: number,
    @CurrentUser('sub') userId: number,
    @Query('populate') populate?: 'subtasks',
  ) {
    return this.tasksService.findManyByColumnId(columnId, userId, populate);
  }

  @ApiResponse(tasksSwaggerDto.postResponse)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiResponse(tasksSwaggerDto.postResponse)
  @Put()
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.tasksService.update(updateTaskDto, userId);
  }

  @ApiResponse(tasksSwaggerDto.deleteResponse)
  @ApiParam({ type: Number, name: 'taskId', schema: { example: 1 } })
  @Delete(':taskId')
  deleteTask(
    @Param('taskId') taskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.tasksService.delete(taskId, userId);
  }
}
