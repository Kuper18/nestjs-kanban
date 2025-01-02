import { Module } from '@nestjs/common';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './providers/subtasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { CreateSubtasksProvider } from './providers/create-subtasks.provider';
import { UpdateSubtasksProvider } from './providers/update-subtasks.provider';
import { DeleteSubtasksProvider } from './providers/delete-subtasks.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  controllers: [SubtasksController],
  providers: [SubtasksService, CreateSubtasksProvider, UpdateSubtasksProvider, DeleteSubtasksProvider],
})
export class SubtasksModule {}
