import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class LoginProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Incorrect password or email.');
    }

    const isValidPassword = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Incorrect password or email.');
    }

    try {
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while generating the access token.',
        { description: error.message },
      );
    }
  }
}
