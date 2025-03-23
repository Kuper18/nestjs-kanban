import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './providers/columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { DeleteColumnProvider } from './providers/delete-column.provider';
import { UpdateColumnProvider } from './providers/update-column.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  controllers: [ColumnsController],
  providers: [ColumnsService, DeleteColumnProvider, UpdateColumnProvider],
  exports: [ColumnsService],
})
export class ColumnsModule {}
