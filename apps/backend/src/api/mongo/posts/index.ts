import { Route } from '../../../api'
import { ApiResponse, Post } from '../../../core'
import { MongoDb } from '../../../database'

async function get(
    db: MongoDb
): Promise<ApiResponse> {
    const result = await db
        .imersaoInstabytes
        .getAll()

    if (result.error) {
        return {
            error: 'Internal error',
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}

async function post(
    db: MongoDb,
    source: Partial<Post>
): Promise<ApiResponse> {
    delete (source.id)
    const result = await db
        .imersaoInstabytes
        .insertOne(source)

    if (result.error) {
        return {
            error: result.error,
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}

async function put(
    db: MongoDb,
    source: Partial<Post>
): Promise<ApiResponse> {
    const result = await db
        .imersaoInstabytes
        .updateOne(source)

    if (result.error) {
        return {
            error: result.error,
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}

export default function route(
    db: MongoDb
): Route[] {
    return [
        {
            methods: [
                {
                    handler: () => get(db),
                    method: 'get'
                },
                {
                    handler: (body) => post(db, body),
                    method: 'post'
                }
            ],
            route: '/api/mongo/posts'
        },
        {
            methods: [
                {
                    handler: (body) => put(db, body),
                    method: 'put'
                }
            ],
            route: '/api/mongo/posts/:id'
        }
    ]
}
