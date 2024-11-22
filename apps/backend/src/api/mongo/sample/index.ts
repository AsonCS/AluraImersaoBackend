import { Route } from '@/api'
import { ApiResponse } from '@/core'
import { MongoDb } from '@/database'

async function get(
    db: MongoDb
): Promise<ApiResponse> {
    const result = await db
        .sample
        .getMovieBackToTheFuture()
    const movie = result.data?.at(0)

    if (result.error || !movie) {
        return {
            error: result.error || 'Movie not found',
            status: 500
        }
    } else {
        return {
            data: movie,
            status: 200
        }
    }
}

export default function sample(
    db: MongoDb
): Route {
    return {
        methods: [
            {
                handler: () => get(db),
                method: 'get'
            }
        ],
        route: '/api/mongo/BackToTheFuture'
    }
}
