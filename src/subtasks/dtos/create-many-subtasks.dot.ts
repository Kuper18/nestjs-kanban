import { ValidateNested } from 'class-validator';
import { CreateSubtaskDto } from './create-subtask.dto';
import { Type } from 'class-transformer';

export class CreateManySubtasksDto {
  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks: CreateSubtaskDto[];
}
