import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { setServerCors } from './server/server.cors'
import { setServerDocs } from './server/server.docs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  const PORT = configService.get<number>('PORT') as number

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.setGlobalPrefix('api')

  setServerCors(app)
  setServerDocs(app, configService)

  await app.listen(PORT)
}
bootstrap()
