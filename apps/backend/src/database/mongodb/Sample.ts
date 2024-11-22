import { ResultArray } from "@/core"

import { collection } from "."

export default {
    getMovieBackToTheFuture: async (): Promise<ResultArray<any>> => {
        return collection({
            db: 'sample_mflix',
            collection: 'movies',
            execute: async (collection) => {
                const query = { title: 'Back to the Future' }
                const movie = await collection.findOne(query)
                return {
                    data: [movie]
                }
            }
        })
    }
}
