import { IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @Length(3, 255)
  title: string;

  @IsOptional()
  @Length(5, 1024)
  description?: string | null;

  @IsInt()
  @Min(1)
  columnId: number;
}
