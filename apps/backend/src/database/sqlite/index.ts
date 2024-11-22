import path from 'path'
import { DatabaseSync } from 'node:sqlite'

import PostTable from './PostTable'
import { Post } from '@/core'

let database: DatabaseSync | null = null

const postTable = new PostTable()

function getDatabase(): DatabaseSync {
    if (database) {
        return database
    }

    const db = new DatabaseSync(
        `${path.resolve()}/src/database/sqlite/database.db`
    )
    console.log('Sqlite DatabaseSync connect')

    database = db
    postTable.createTable(db)

    return db
}

export interface Result {
    changes?: number | bigint
    error?: any
    lastInsertRowid?: number | bigint
}

export default {
    postTable: {
        getAll: () => postTable.getAll(getDatabase()),
        insert: (
            source: Partial<Post>
        ) => postTable.insert(getDatabase(), source)
    }
}
