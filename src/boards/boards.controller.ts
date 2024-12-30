import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardsService } from './providers/boards.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(@CurrentUser('sub') userId: number) {
    return this.boardsService.getAll(userId);
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.boardsService.create(createBoardDto, userId);
  }

  @Put()
  updateBoard(
    @Body() updateBoardDto: UpdateBoardDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.boardsService.update(updateBoardDto, userId);
  }

  @Delete(':boardId')
  deleteBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.boardsService.delete(boardId, userId);
  }
}
