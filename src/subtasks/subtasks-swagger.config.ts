import { ApiResponseOptions } from '@nestjs/swagger';

const getResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Get subtasks response',
      value: [
        { id: 1, title: 'Talk to potential customers.', isCompleted: false },
      ],
    },
  },
};

const postResponse: ApiResponseOptions = {
  status: 201,
  examples: {
    example: {
      summary: 'Post subtask response',
      value: [
        { id: 1, title: 'Talk to potential customers.', isCompleted: false },
        {
          id: 2,
          title: 'Outline a business model that works for our solution',
          isCompleted: false,
        },
      ],
    },
  },
};

const deleteResponse: ApiResponseOptions = {
  status: 200,
  examples: {
    example: {
      summary: 'Delete subtask response',
      value: { message: `Subtask by ID: '1' was deleted.` },
    },
  },
};

export default {
  deleteResponse,
  postResponse,
  getResponse,
};
