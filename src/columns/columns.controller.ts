import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { ColumnsService } from './providers/columns.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly conlumnsService: ColumnsService) {}

  @Get(':boardId')
  getColumns(@Param('boardId') boardId: number) {
    return this.conlumnsService.findMany(boardId);
  }

  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.conlumnsService.create(createColumnDto);
  }

  @Delete(':columnId')
  deleteColumn(
    @Param('columnId') columnId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.conlumnsService.delete(columnId, userId);
  }
}
