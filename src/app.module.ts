import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import configuration from './config/configuration';
import envValidation from './config/env.validation';
import { EnvVariables } from './interfaces/env-variables.interface';
import { SubtasksModule } from './subtasks/subtasks.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

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
          autoLoadEntities: true,
          host: config.dbHost,
          port: config.dbPort,
          username: config.dbUsername,
          password: config.dbPassword,
          database: config.dbName,
          synchronize: config.dbAutoload,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
    UsersModule,
    BoardsModule,
    AuthModule,
    ColumnsModule,
    TasksModule,
    SubtasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
