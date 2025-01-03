import { ApiResponseOptions } from '@nestjs/swagger';

const getResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Get tasks response',
      value: [
        { id: 1, title: 'Feed the cat', description: 'Need to feed my cat' },
        { id: 2, title: 'Cook dinner', description: null },
      ],
    },
  },
};

const postResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Post task response',
      value: {
        id: 1,
        title: 'Cook dinner',
        description: null,
      },
    },
  },
};

const deleteResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Delete task response',
      value: { message: `Task by ID: '1' was deleted.` },
    },
  },
};

export default {
  deleteResponse,
  postResponse,
  getResponse,
};
