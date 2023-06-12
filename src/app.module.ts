import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import * as winston from 'winston';
import { 
    utilities as nestWinstonModuleUtilities,
    WinstonModule 
} from 'nest-winston';
import defaultConfig from './config/defaultConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [

        // ENV
        ConfigModule.forRoot({
            envFilePath:[`${__dirname}/config/env/.env.${process.env.NODE_ENV}`],
            load: [defaultConfig],
            isGlobal: true
        }),

        // TypeORM
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '',
            port: 3306,
            username: '',
            password: '',
            database: '',
            entities: [__dirname + `/**/*.entity{.ts,.js}`],
        }),

        // Sequelize
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: '',
            port: 3306,
            username: '',
            password: '',
            database: '',
            models: [__dirname + `/**/*.entity{.ts,.js}`],
        }),

        // Logging
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', {prettyPrint: true}),
                    )
                })
            ]
        }),

    ],

    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
        .apply(LoggerMiddleware)
        .forRoutes('/users');
    }
}
