import mongodb from "@/mongodb"
import { Response } from "../"

export default async function get(): Promise<Response> {
    const result = await mongodb
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
