import express from 'express';

import { UserController } from '.';

import { Url } from '../models';

const router = express.Router();

router.route(Url.DELETE).delete(UserController.delete);
router.route(Url.GET).get(UserController.getUser);
router.route(Url.LOGIN).post(UserController.login);
router.route(Url.LOGOUT).patch(UserController.logout);
router.route(Url.REGISTER).post(UserController.register);
router.route(Url.UPDATE).patch(UserController.updateGameLevel);

export { router };
