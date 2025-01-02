import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateManySubtasksDto } from './dtos/create-many-subtasks.dot';
import { SubtasksService } from './providers/subtasks.service';
import { UpdateSubtaskDto } from './dtos/update-subtask.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get(':taskId')
  getSubtasks(
    @Param('taskId') taskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.subtasksService.findMany(taskId, userId);
  }

  @Post()
  createSubtasks(@Body() createManySubtasksDto: CreateManySubtasksDto) {
    return this.subtasksService.createMany(createManySubtasksDto);
  }

  @Patch()
  updateSubtask(
    @Body() updateSubtaskDto: UpdateSubtaskDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.subtasksService.update(updateSubtaskDto, userId);
  }

  @Delete(':subtaskId')
  deleteSubTask(
    @Param('subtaskId') subtaskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.subtasksService.delete(subtaskId, userId);
  }
}
