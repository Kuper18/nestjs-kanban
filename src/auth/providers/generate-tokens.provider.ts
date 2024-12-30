import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import {
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
} from '../constants/auth.constants';
import { ConfigType } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: string, payload?: T) {
    return await this.jwtService.signAsync(
      { sub: userId, ...payload },
      { expiresIn, secret: this.config.jwtSecret },
    );
  }

  public async generateTokens(user: User) {
    try {
      const [access_token, refresh_token] = await Promise.all([
        this.signToken(user.id, accessTokenExpiresIn, { email: user.email }),
        this.signToken(user.id, refreshTokenExpiresIn),
      ]);

      return { access_token, refresh_token };
    } catch (error) {
      throw new RequestTimeoutException('Failed to generate access token.', {
        description: error.message,
      });
    }
  }
}
