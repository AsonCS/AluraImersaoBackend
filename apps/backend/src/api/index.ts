import { Express } from 'express'
import fileUpload from 'express-fileupload'

import { ApiResponse } from '@/core'
import { MongoDb, SqliteDb } from '@/database'

import gemini from './gemini'
import mongo from './mongo'
import sqlite from './sqlite'
import { FileSystem } from '@/file_system'

export interface Method {
    handler: (
        body: any
    ) => Promise<ApiResponse>
    method: string
    middlewareFileUpload?: boolean
}

export interface Route {
    methods: Method[]
    route: string
}


export default function routes(
    app: Express,
    fs: FileSystem,
    mongoDb: MongoDb,
    sqliteDb: SqliteDb
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

    let routes: Route[] = []
    routes.push(gemini(mongoDb, fs))
    routes = routes.concat(mongo(mongoDb))
    routes = routes.concat(sqlite(sqliteDb))

    routes.forEach(route => {
        const expressRoute = app.route(route.route)
        route.methods.forEach(method => {
            async function handler(req: any, res: any) {
                const body = req.body ?? {}
                const files = req.files ?? {}
                const params = req.params ?? {}
                const result = await method.handler({
                    ...body,
                    ...files,
                    ...params
                })
                res.status(result.status)
                    .json(result)
            }
            if (method.middlewareFileUpload) {
                (expressRoute as any)[method.method](
                    fileUpload(),
                    handler
                )
            } else {
                (expressRoute as any)[method.method](handler)
            }
        })
    })
}
