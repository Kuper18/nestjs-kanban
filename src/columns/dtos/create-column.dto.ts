import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Length, Min } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({ type: String, example: 'Doing' })
  @Length(3, 60)
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  boardId: number;
}
