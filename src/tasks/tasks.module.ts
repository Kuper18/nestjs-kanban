import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './providers/tasks.service';
import { CreateTaskProvider } from './providers/create-task.provider';
import { UpdateTaskProvider } from './providers/update-task.provider';
import { DeleteTaskProvider } from './providers/delete-task.provider';
import { ColumnsModule } from 'src/columns/columns.module';
import { FindManyTasksProvider } from './providers/find-many-tasks.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ColumnsModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    CreateTaskProvider,
    UpdateTaskProvider,
    DeleteTaskProvider,
    FindManyTasksProvider,
  ],
})
export class TasksModule {}
