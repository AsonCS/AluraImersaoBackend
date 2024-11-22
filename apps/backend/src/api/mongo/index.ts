import { MongoDb } from '@/database'

import posts from './posts'
import sample from './sample'
import upload from './upload'
import { Route } from '..'

export default function routes(
    db: MongoDb
): Route[] {
    const routes = posts(db)
    routes.push(sample(db))
    routes.push(upload(db))
    return routes
}
