import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { LoginProvider } from './providers/login.provider';
import { RefreshTokenProvider } from './providers/refresh-token.provider';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GenerateTokensProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
    LoginProvider,
    RefreshTokenProvider,
  ],
  exports: [HashingProvider, GenerateTokensProvider],
})
export class AuthModule {}
