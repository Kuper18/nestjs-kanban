import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(data, encrypted);
    } catch (error) {
      throw new RequestTimeoutException('Could not compare passwords.', {
        description: error.message,
      });
    }
  }

  async hashPassword(data: string | Buffer): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();

      return await bcrypt.hash(data, salt);
    } catch (error) {
      throw new RequestTimeoutException('Could not hash password.', {
        description: error.message,
      });
    }
  }
}
