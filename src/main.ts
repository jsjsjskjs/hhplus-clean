import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Clean Architecture API`)
    .setDescription(`Clean Architecture API description`)
    .setVersion("0.1")
    .build()
  SwaggerModule.setup(`/docs`, app, SwaggerModule.createDocument(app, swaggerConfig))
  await app.listen(3000)
}
bootstrap()
