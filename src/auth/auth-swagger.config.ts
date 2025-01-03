import { ApiResponseOptions } from '@nestjs/swagger';

const loginResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Login response',
      value: {
        access_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
        refresh_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
      },
    },
  },
};

const refreshTokenResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Refresh tokens response',
      value: {
        access_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
        refresh_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
      },
    },
  },
};

export default { loginResponse, refreshTokenResponse };
