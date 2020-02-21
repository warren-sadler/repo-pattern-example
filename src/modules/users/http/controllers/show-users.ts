import * as express from 'express';
import { BaseController } from "../../../../core/http/base-controller";
import {IUserRepository} from '../../repository'


export default class ShowUsersController extends BaseController {
    private userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        super();
        this.userRepository = userRepository;
    }

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            const users = await this.userRepository.showAllUsers();
            if (users) {
                this.ok(res, users);
            } else {
                this.fail(res, 'Failed to retrieve users');
            }
        } catch(err) {
            this.fail(res, err);
        }
    }
}