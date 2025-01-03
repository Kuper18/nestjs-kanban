import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { FindOneByIdProvider } from './find-one-by-id.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

  async delete(userId: number) {
    try {
      await this.usersRepository.delete(userId);

      return { message: `User by ID: '${userId}' was deleted.` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot delete a user at the moment. Please try again later.',
        { description: error.message || 'Unknown error.' },
      );
    }
  }
}
