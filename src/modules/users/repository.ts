import {createConnection, Connection, ConnectionOptions} from 'typeorm';
import { User } from './entity';
import {rootDIR} from '../../config/constants';

const options: ConnectionOptions = {
    type: "sqlite",
    database: `${rootDIR}/test.sqlite`,
    entities: [ User ],
    logging: true,
    synchronize: true
  }

export interface IUserRepository {
    findUserById(id: number): Promise<void | User[]>;
    showAllUsers(): Promise<void | User[]>;
}

export default class UserRepository implements IUserRepository {
    private strategy: IUserRepository;
    /**
     *  It should be noted that we could decide to register whatever
     * repository we choose. Currently the only distinction is on environment.
     * @param env {string}
     */
    constructor(env: string = process.env.NODE_ENV) {
        if (env === 'production') {
            this.strategy = new TypeORMUserRepository();
        } else {
            this.strategy = new InMemoryUserRepository();
        }
    }
    findUserById(id: number) {
        return this.strategy.findUserById(id);
    }
    showAllUsers() {
        return this.strategy.showAllUsers();
    }
}

export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = [
        {id: 1, name: 'DudeMan'}
    ]
    constructor() {
        console.info('[UserRepository] Initialized as InMemory Repository');
    }
    public findUserById(id: number): Promise<void | User[]> {
        return new Promise((res) => {
            return res(this.users.filter(({id: userID}) => userID === id));
        });  
    }

    public showAllUsers(): Promise<void | User[]> {
        return new Promise((res) => {
            return res(this.users);
        });  
    }
}

export class TypeORMUserRepository implements IUserRepository {
    private connection: Connection;
    constructor() {
        console.info('[UserRepository] Initialized as TypeORM Repository');
    }
    public async findUserById(id: number) {
        try {
            if (!this.connection) {
                this.connection = await createConnection(options);
            }
            let userRepository = this.connection.getRepository(User);
            let users = userRepository.find({id});
            return users;
        } catch (err) {
            console.error(err);
        }
    }
    public async showAllUsers() {
        try {
            if (!this.connection) {
                this.connection = await createConnection(options);
            }
            let userRepository = this.connection.getRepository(User);
            let users = userRepository.find();
            return users;
        } catch(err) {
            console.error(err);
        }
    }
}