import { IsInt, Min } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto extends CreateBoardDto {
  @ApiProperty({ type: Number, example: 4 })
  @IsInt()
  @Min(1)
  boardId: number;
}
