import { ValidateNested } from 'class-validator';
import { CreateSubtaskDto } from './create-subtask.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManySubtasksDto {
  @ApiProperty({
    type: Array,
    example: [
      {
        title: 'Talk to potential customers.',
        taskId: 1,
      },
      {
        title: 'Outline a business model that works for our solution.',
        taskId: 1,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks: CreateSubtaskDto[];
}
