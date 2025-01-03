import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: String, example: 'Cook dinner' })
  @Length(3, 255)
  title: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Can be string or null',
    example: null,
  })
  @IsOptional()
  @Length(5, 1024)
  description?: string | null;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  columnId: number;
}
