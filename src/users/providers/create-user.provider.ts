import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { confirmedPassword, password, email } = createUserDto;
    const user = await this.findOneByEmailProvider.findOne(email);

    if (user) {
      throw new BadRequestException('User already exists.', {
        description: 'You cannot register with this email.',
      });
    }

    if (confirmedPassword !== password) {
      throw new BadRequestException('Passwords are not matched.', {
        description: 'You should carefully compare your passwords.',
      });
    }

    try {
      const hashedPassword = await this.hashingProvider.hashPassword(password);
      const newUser = await this.usersRepository.save(
        this.usersRepository.create({
          ...createUserDto,
          password: hashedPassword,
        }),
      );

      return await this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Cannot create a user at this moment. Please try again later.',
        { description: error.massage || 'Unknown error.' },
      );
    }
  }
}
