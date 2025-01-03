import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateManySubtasksDto } from './dtos/create-many-subtasks.dot';
import { UpdateSubtaskDto } from './dtos/update-subtask.dto';
import { SubtasksService } from './providers/subtasks.service';
import subtasksSwaggerConfig from './subtasks-swagger.config';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @ApiResponse(subtasksSwaggerConfig.getResponse)
  @ApiParam({ type: Number, name: 'taskId', schema: { example: 1 } })
  @Get(':taskId')
  getSubtasks(
    @Param('taskId') taskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.subtasksService.findMany(taskId, userId);
  }

  @ApiResponse(subtasksSwaggerConfig.postResponse)
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

  @ApiParam({ type: Number, name: 'subtaskId', schema: { example: 1 } })
  @ApiResponse(subtasksSwaggerConfig.deleteResponse)
  @Delete(':subtaskId')
  deleteSubTask(
    @Param('subtaskId') subtaskId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.subtasksService.delete(subtaskId, userId);
  }
}
