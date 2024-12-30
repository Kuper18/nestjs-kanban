import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindOneByEmailProvider,
    CreateUserProvider,
    FindOneByIdProvider,
  ],
  exports: [UsersService],
})
export class UsersModule {}
