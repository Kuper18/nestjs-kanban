import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { FindOneByIdProvider } from './find-one-by-id.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByIdProvider: FindOneByIdProvider,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneByEmailProvider.findOne(email);
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  async findOneById(userId: number) {
    return await this.findOneByIdProvider.findOneById(userId);
  }
}
