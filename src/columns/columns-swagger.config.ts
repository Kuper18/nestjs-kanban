import { ApiResponseOptions } from '@nestjs/swagger';

const getResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Get columns response',
      value: [{ id: 1, name: 'Todo' }],
    },
  },
};

const postResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Post columns response',
      value: { id: 4, name: 'Doing' },
    },
  },
};

const deleteResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Delete columns response',
      value: { message: `Column by ID: '1' was deleted.` },
    },
  },
};

export default {
  deleteResponse,
  postResponse,
  getResponse,
};
