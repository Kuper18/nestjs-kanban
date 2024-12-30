import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 20)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 20)
  lastName: string;

  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsNotEmpty()
  @Length(8, 64)
  confirmedPassword: string;
}
