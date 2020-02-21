import * as express from 'express';
import {Router} from 'express';
import {
    showUsersController
} from './controllers'

const usersRouter: Router = Router();

usersRouter.get('/', (req,res,) => showUsersController.execute(req, res));
usersRouter.get('/all', (req, res) => showUsersController.execute(req, res));

export default usersRouter;