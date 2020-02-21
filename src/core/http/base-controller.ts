import * as express from 'express';


export abstract class BaseController {
    abstract executeImpl(req: express.Request,
                         res: express.Response): Promise<void>;
    async execute(req: express.Request, res: express.Response): Promise<void | any> {
        try {
            await this.executeImpl(req, res);
        } catch(err) {
            console.error(`[BaseController]: Uncaught controller error`);
            this.fail(res, err);
        }
    }

    public ok<T>(res: express.Response, dataObject: T) {
        if (!!dataObject) {
            res.type('application/json')
            .json(dataObject);
        } else {
            res.sendStatus(200);
        }
    }

    public fail(res: express.Response, error: Error | string) {
        res.status(500).json({
            message: error.toString()
        });
    }
}