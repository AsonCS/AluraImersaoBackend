import { Express } from 'express'

import get from './get'
import post from './post'

export default function posts(
    app: Express
) {
    const posts = app.route('/api/posts')
    posts.get((_, res) => {
        const response = get()
        res.status(response.status)
            .json(response)
    })
    posts.post((req, res) => {
        const response = post(req.body)
        res.status(response.status)
            .json(response)
    })
}
