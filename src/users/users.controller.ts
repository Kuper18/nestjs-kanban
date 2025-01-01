import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ICurrentUser } from 'src/interfaces/current-user.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll(@CurrentUser() user: ICurrentUser) {
    return this.usersService.findOneById(user.sub);
  }

  @Public()
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Public()
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersRepository.delete(userId);
  }
}
