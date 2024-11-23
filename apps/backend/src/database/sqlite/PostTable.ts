// import { DatabaseSync } from 'node:sqlite'

import { Post, ResultArray } from '../../core'
import { Result } from '.'

export default class PostTable {
    tableName = 'post'

    fieldDescription = 'description'
    fieldId = 'id'
    fieldImage = 'image'

    createTable = (database: any/*DatabaseSync*/) => {
        database.exec(`
            CREATE TABLE IF NOT EXISTS ${this.tableName}(
              ${this.fieldDescription} TEXT,
              ${this.fieldId} INTEGER PRIMARY KEY,
              ${this.fieldImage} TEXT
            ) STRICT
        `)
    }

    getAll = (
        database: any/*DatabaseSync*/
    ): ResultArray<Post> => {
        try {
            const result = database.prepare(`
                SELECT * FROM ${this.tableName}
            `).all()

            return {
                data: result.map((value: any) => {
                    return {
                        description: value.description,
                        id: value.id,
                        image_alt: value.image_alt,
                        image_url: value.image_url
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
        database: any/*DatabaseSync*/,
        source: Partial<Post>
    ): Result => {
        const {
            description,
            image_url
        } = source
        const erros: string[] = []

        if (!description) {
            erros.push('Must have a description')
        }
        if (!image_url) {
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
            `).run(description!, image_url!)

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
