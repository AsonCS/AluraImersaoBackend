import { Express } from 'express'

import get from './get'

export default function sample(
    app: Express
) {
    const posts = app.route('/api/BackToTheFuture')
    posts.get(async (_, res) => {
        const response = await get()
        res.status(response.status)
            .json(response)
    })
}
