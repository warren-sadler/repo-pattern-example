import ShowUsersController from './show-users';
import UserRepository from '../../repository';

export const showUsersController = new ShowUsersController(new UserRepository());