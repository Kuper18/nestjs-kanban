import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { USER_KEY } from '../constants/auth.constants';
import { ICurrentUser } from 'src/interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
  (field: keyof ICurrentUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ICurrentUser = request[USER_KEY];

    return field ? user?.[field] : user;
  },
);
