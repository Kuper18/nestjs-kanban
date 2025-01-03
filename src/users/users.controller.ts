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
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import usersSwaggerConfig from './users-swagger.config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse(usersSwaggerConfig.getMeResponse)
  @Get('me')
  findOne(@CurrentUser() user: ICurrentUser) {
    return this.usersService.findOneById(user.sub);
  }

  @ApiResponse(usersSwaggerConfig.signupResponse)
  @Public()
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiResponse(usersSwaggerConfig.deleteResponse)
  @ApiParam({ type: Number, name: 'userId', schema: { example: 1 } })
  @Public()
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.delete(userId);
  }
}
