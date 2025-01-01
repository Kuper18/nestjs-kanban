import { IsInt, Min } from 'class-validator';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends CreateBoardDto {
  @IsInt()
  @Min(1)
  boardId: number;
}
