import { Route } from '@/api'
import { ApiResponse, Post } from '@/core'
import { SqliteDb } from '@/database'

async function get(
    db: SqliteDb
): Promise<ApiResponse> {
    const result = db
        .postTable
        .getAll()

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

async function post(
    db: SqliteDb,
    source: Partial<Post>
): Promise<ApiResponse> {
    const result = db
        .postTable
        .insert(source)

    if (result.error) {
        return {
            error: result.error,
            status: 500
        }
    } else {
        return {
            data: result,
            status: 200
        }
    }
}

export default function posts(
    db: SqliteDb
): Route {
    return {
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
        route: '/api/sqlite/posts'
    }
}
