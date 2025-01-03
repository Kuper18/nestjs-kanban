import { IsInt, Min } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  taskId: number;
}
