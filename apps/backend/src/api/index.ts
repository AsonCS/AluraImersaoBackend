import { Express } from 'express'

import post from './post'
import sample from './sample'

export interface Response {
    data?: any
    error?: any
    status: number
}

export default function routes(
    app: Express
) {
    const api = app.route('/api')
    api.get((_, res) => {
        res
            .status(200)
            .json(
                {
                    code: 200,
                    route: 'api',
                    status: 'OK'
                }
            )
    })

    post(app)
    sample(app)
}
