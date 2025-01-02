import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, Min } from 'class-validator';
import { CreateSubtaskDto } from './create-subtask.dto';

export class UpdateSubtaskDto extends PartialType(
  OmitType(CreateSubtaskDto, ['taskId'] as const),
) {
  @IsBoolean()
  isCompleted: boolean;

  @IsInt()
  @Min(1)
  subtaskId: number;
}
