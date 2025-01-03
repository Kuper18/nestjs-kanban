import { ApiResponseOptions } from '@nestjs/swagger';

const signupResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Signup response',
      value: {
        access_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
        refresh_token: 'hdCI6MTczNTgzMTk1OSwiZXhwIjoxNzM1ODM5MTU',
      },
    },
  },
};

const getMeResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'User information response',
      value: {
        id: 1,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.com',
      },
    },
  },
};

const deleteResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Delete user response',
      value: {
        message: `User by ID: '1' was deleted.`,
      },
    },
  },
};

export default {
  signupResponse,
  getMeResponse,
  deleteResponse,
};
