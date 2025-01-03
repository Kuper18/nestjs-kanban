import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { ColumnsService } from './providers/columns.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import columnsSwaggerConfig from './columns-swagger.config';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly conlumnsService: ColumnsService) {}

  @ApiResponse(columnsSwaggerConfig.getResponse)
  @ApiParam({ type: Number, name: 'boardId', schema: { example: 1 } })
  @Get(':boardId')
  getColumns(@Param('boardId') boardId: number) {
    return this.conlumnsService.findMany(boardId);
  }

  @ApiResponse(columnsSwaggerConfig.postResponse)
  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.conlumnsService.create(createColumnDto);
  }

  @ApiParam({ type: Number, name: 'columnId', schema: { example: 1 } })
  @ApiResponse(columnsSwaggerConfig.deleteResponse)
  @Delete(':columnId')
  deleteColumn(
    @Param('columnId') columnId: number,
    @CurrentUser('sub') userId: number,
  ) {
    return this.conlumnsService.delete(columnId, userId);
  }
}
