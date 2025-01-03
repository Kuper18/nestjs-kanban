import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneById(userId: number) {
    let user = null;
    try {
      user = await this.usersRepository.findOne({
        where: { id: userId },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
        { description: error.message },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found.', {
        description: 'User with this ID does not exist.',
      });
    }

    return user;
  }
}
