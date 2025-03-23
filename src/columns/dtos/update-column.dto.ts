import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateColumnDto extends OmitType(CreateColumnDto, ['boardId']) {
  @ApiProperty({ type: Number, example: 4 })
  @IsInt()
  @Min(1)
  columnId: number;
}
