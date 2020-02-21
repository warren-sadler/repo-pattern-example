import * as express from 'express';
import usersRouter from './modules/users/http/router';

const app: express.Application = express();
app.use('/api/v1/users', usersRouter);

app.listen(8080, () => {
    console.log('App running on port 8080');
});