import { IsInt, Length, Min } from 'class-validator';

export class CreateSubtaskDto {
  @Length(3, 125)
  title: string;

  @IsInt()
  @Min(1)
  taskId: number;
}
