import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, FindOneByEmailProvider, CreateUserProvider, FindOneByIdProvider],
  exports: [UsersService],
})
export class UsersModule {}
