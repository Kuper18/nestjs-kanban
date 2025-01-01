import { IsInt, Length, Min } from 'class-validator';

export class CreateColumnDto {
  @Length(3, 60)
  name: string;

  @IsInt()
  @Min(1)
  boardId: number;
}
