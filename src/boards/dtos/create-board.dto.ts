import { Length } from 'class-validator';

export class CreateBoardDto {
  @Length(3, 1024)
  name: string;
}
