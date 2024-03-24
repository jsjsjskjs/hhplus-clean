import { MiddlewareConsumer, Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ormConfig } from "@root/config/orm.config"
import { ClientModule } from "./client/client.module"
import { LectureModule } from "./lecture/lecture.module"
import { LoggerMiddleware } from "@root/shared/middleware/logger.middleware"

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), ClientModule, LectureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }

  set;
}
