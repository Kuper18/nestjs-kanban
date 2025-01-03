import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ type: String, example: 'token_goes_here' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
