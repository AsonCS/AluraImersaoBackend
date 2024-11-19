import { DatabaseSync } from 'node:sqlite'

import { Post } from '@/core'
import { Result, ResultQuery } from '.'

export default class PostTable {
    tableName = 'post'

    fieldDescription = 'description'
    fieldId = 'id'
    fieldImage = 'image'

    createTable = (database: DatabaseSync) => {
        database.exec(`
            CREATE TABLE IF NOT EXISTS ${this.tableName}(
              ${this.fieldDescription} TEXT,
              ${this.fieldId} INTEGER PRIMARY KEY,
              ${this.fieldImage} TEXT
            ) STRICT
        `)
    }

    getAll = (
        database: DatabaseSync
    ): ResultQuery<Post> => {
        try {
            const result = database.prepare(`
                SELECT * FROM ${this.tableName}
            `).all()

            return {
                data: result.map((value: any) => {
                    return {
                        description: value.description,
                        id: value.id,
                        image: value.image
                    }
                })
            }
        } catch (e) {
            console.error(e)
            return {
                error: e
            }
        }
    }

    insert = (
        database: DatabaseSync,
        source: Partial<Post>
    ): Result => {
        const {
            description,
            image
        } = source
        const erros = []

        if (!description) {
            erros.push('Must have a description')
        }
        if (!image) {
            erros.push('Must have an image')
        }

        if (erros.length > 0) {
            return {
                error: erros
            }
        }

        try {
            const result = database.prepare(`
                INSERT INTO ${this.tableName} (
                    ${this.fieldDescription}, 
                    ${this.fieldImage}
                ) VALUES (?, ?)
            `).run(description!, image!)

            return {
                changes: result.changes,
                lastInsertRowid: result.lastInsertRowid
            }
        } catch (e) {
            console.error(e)
            return {
                error: e
            }
        }
    }
}
