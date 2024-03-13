declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const store = MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    collectionName: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 1,
    stringify: false,
  });

  app.use(
    session({
      secret: 'keyboard',
      resave: true,
      saveUninitialized: false,
      store: store,
      cookie: {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: false,
      },
    }),
  );

  app.enableCors({
    origin: ['*'],
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
  });

  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
