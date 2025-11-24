import { INestApplication } from '@nestjs/common'

export const setServerCors = (app: INestApplication) => {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
  })
}
