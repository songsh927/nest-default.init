import { Injectable, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import {LoggerMiddleware} from './logger.middleware';

export function middlewareList(consumer : MiddlewareConsumer){
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(
            {path: '/hello', method: RequestMethod.GET}
        );

    consumer
        .apply(LoggerMiddleware)
        .forRoutes(
            {path: '/test', method: RequestMethod.GET}
        );
}