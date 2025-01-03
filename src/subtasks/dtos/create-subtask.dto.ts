import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Length, Min } from 'class-validator';

export class CreateSubtaskDto {
  @ApiProperty({ type: String, example: 'Talk to potential customers.' })
  @Length(3, 125)
  title: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  taskId: number;
}
