import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'P@ssw0rd!' })
  @IsNotEmpty()
  @Length(8, 64)
  password: string;
}
