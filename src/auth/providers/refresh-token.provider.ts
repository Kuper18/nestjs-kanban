import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokenProvider {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,

    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async refreshTokens({ refreshToken }: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.jwtSecret,
      });
      const user = await this.usersService.findOneById(sub);

      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Unauthorized.', {
        description: error.message,
      });
    }
  }
}
