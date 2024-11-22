import { Post, Result, ResultArray, ResultSingle } from "@/core"

import mongoDb from './mongodb'
import sqliteDb from './sqlite'

export interface MongoDb {
    imersaoInstabytes: {
        getAll: () => Promise<ResultArray<Post>>,
        insertOne: (
            source: Partial<Post>
        ) => Promise<ResultSingle<Post>>,
        updateOne: (
            source: Partial<Post>
        ) => Promise<ResultSingle<Partial<Post>>>
    },
    sample: {
        getMovieBackToTheFuture: () => Promise<any>
    }
}

export interface SqliteDb {
    postTable: {
        getAll(): ResultArray<Post>,
        insert(
            source: Partial<Post>
        ): Result<any>
    }
}

export {
    mongoDb,
    sqliteDb
}
