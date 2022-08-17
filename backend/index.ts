import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import session from 'express-session';

import { router } from './api';

import { Url } from './models';

import { initializePassport } from './utils';

const PORT = process.env.PORT || 4002;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (!process.env.SECRET_CODE || !process.env.MONGO_URL) {
  process.exit(1);
}

app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'sessions',
      autoRemove: 'interval',
      autoRemoveInterval: 30,
    }),
    cookie: {
      maxAge: 6 * 60 * 60 * 1000,
    },
  })
);
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(Url.USER, router);

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
} catch (err) {
  console.log(err);
  mongoose.connection.close();
  process.exit(1);
}
