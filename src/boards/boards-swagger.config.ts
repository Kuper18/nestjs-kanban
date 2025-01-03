import { ApiResponseOptions } from '@nestjs/swagger';

const getResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Get boards response',
      value: [
        { id: 1, name: 'Platform Launch' },
        { id: 2, name: 'Marketing Plan' },
        { id: 3, name: 'Roadmap' },
      ],
    },
  },
};

const postResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Post boards response',
      value: { id: 4, name: 'Roadmap' },
    },
  },
};

const deleteResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Delete boards response',
      value: { message: `Board by ID: '1' was deleted.` },
    },
  },
};

export default {
  deleteResponse,
  postResponse,
  getResponse,
};
