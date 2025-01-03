import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'Bob' })
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({ type: String, example: 'Smith' })
  @IsNotEmpty()
  @Length(2, 20)
  lastName: string;

  @ApiProperty({ type: String, example: 'email@example.com' })
  @IsEmail()
  @MaxLength(64)
  email: string;

  @ApiProperty({ type: String, example: '1234Test@' })
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @ApiProperty({ type: String, example: '1234Test@' })
  @IsNotEmpty()
  @Length(8, 64)
  confirmedPassword: string;
}
