import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column.dto';
import { ColumnsService } from './providers/columns.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import columnsSwaggerConfig from './columns-swagger.config';
import { UpdateColumnDto } from './dtos/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly conlumnsService: ColumnsService) {}

  @ApiResponse(columnsSwaggerConfig.getResponse)
  @ApiParam({ type: Number, name: 'boardId', schema: { example: 1 } })
  @ApiQuery({
    name: 'populate',
    required: false,
    type: String,
    examples: {
      example1: {
        summary: 'Populate with relations',
        value: 'tasks,subtasks',
      },
      example2: {
        summary: 'Populate only tasks',
        value: 'tasks',
      },
    },
  })
  @Get(':boardId')
  getColumns(
    @Param('boardId') boardId: number,
    @Query('populate') populate?: 'tasks' | 'tasks,subtasks',
  ) {
    return this.conlumnsService.findMany(boardId, populate);
  }

  @ApiResponse(columnsSwaggerConfig.postResponse)
  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.conlumnsService.create(createColumnDto);
  }

  @ApiResponse(columnsSwaggerConfig.postResponse)
  @Put()
  updateColumn(
    @Body() updateColumnDto: UpdateColumnDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.conlumnsService.update(updateColumnDto, userId);
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
