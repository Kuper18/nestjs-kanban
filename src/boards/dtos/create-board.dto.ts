import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ type: String, example: 'Roadmap' })
  @Length(3, 250)
  name: string;
}
