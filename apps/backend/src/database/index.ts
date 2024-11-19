import path from 'path'
import { DatabaseSync } from 'node:sqlite'

import PostTable from './PostTable'
import { Post } from '@/core'

const database = new DatabaseSync(
    `${path.resolve()}/src/database/database.db`
)

const postTable = new PostTable()
postTable.createTable(database)

export interface Result {
    changes?: number | bigint
    error?: any
    lastInsertRowid?: number | bigint
}

export interface ResultQuery<T> {
    data?: Array<T>
    error?: any
}

export default {
    postTable: {
        getAll: () => postTable.getAll(database),
        insert: (
            source: Partial<Post>
        ) => postTable.insert(database, source)
    }
}
