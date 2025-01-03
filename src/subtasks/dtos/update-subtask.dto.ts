import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { CreateSubtaskDto } from './create-subtask.dto';
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

export class UpdateSubtaskDto extends PartialType(
  OmitType(CreateSubtaskDto, ['taskId'] as const),
) {
  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  subtaskId: number;
}
