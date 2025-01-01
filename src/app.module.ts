import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import configuration from './config/configuration';
import envValidation from './config/env.validation';
import { EnvVariables } from './interfaces/env-variables.interface';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/boards.entity';
import { ColumnsModule } from './columns/columns.module';
import { Column } from './columns/column.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<EnvVariables>('config');
        return {
          type: 'postgres',
          entities: [User, Board, Column],
          host: config.dbHost,
          port: config.dbPort,
          username: config.dbUsername,
          password: config.dbPassword,
          database: config.dbName,
          synchronize: config.dbAutoload,
        };
      },
    }),
    UsersModule,
    BoardsModule,
    AuthModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
