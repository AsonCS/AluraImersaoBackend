import { MongoClient } from "mongodb"

import { ResultQuery } from "."

export default class Sample {
    getMovieBackToTheFuture = async (
        client: MongoClient
    ): Promise<ResultQuery<any>> => {
        try {
            const database = client.db('sample_mflix')
            const movies = database.collection('movies')

            const query = { title: 'Back to the Future' }
            const movie = await movies.findOne(query)

            return {
                data: [movie]
            }
        } catch (e) {
            console.error(e)
            return {
                error: e
            }
        } finally {
            await client.close()
        }
    }
}