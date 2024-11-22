import { cleanPost, Post, ResultArray, ResultSingle } from "@/core"

import { collection } from "."
import { ObjectId } from "mongodb"

const db = 'imersao-instabytes'
const postsCollection = 'posts'

export default {
    getAll: async (): Promise<ResultArray<Post>> => {
        return collection<Post, ResultArray<Post>>({
            db: db,
            collection: postsCollection,
            execute: async (collection) => {
                const result = await collection
                    .find()
                    .toArray()
                const posts: Post[] = result.map(value => ({
                    description: value.description,
                    id: value._id,
                    image_alt: value.image_alt,
                    image_url: value.image_url
                }))
                return {
                    data: posts
                }
            }
        })
    },
    insertOne: async (
        source: Partial<Post>
    ): Promise<ResultSingle<Post>> => {
        return collection<Post, ResultSingle<Post>>({
            db: db,
            collection: postsCollection,
            execute: async (collection) => {
                const cleanObject = cleanPost(source, {
                    checkId: false
                })
                if (source.id) {
                    cleanObject._id = ObjectId.createFromHexString(source.id)
                }
                delete (cleanObject.id)

                const result = await collection
                    .insertOne(cleanObject)
                cleanObject.id = result.insertedId
                    .toString()

                return {
                    data: {
                        description: cleanObject.description,
                        id: cleanObject.id,
                        image_alt: cleanObject.image_alt,
                        image_url: cleanObject.image_url
                    }
                }
            }
        })
    },
    updateOne: async (
        source: Partial<Post>
    ): Promise<ResultSingle<Partial<Post>>> => {
        return collection<Partial<Post>, ResultSingle<Partial<Post>>>({
            db: db,
            collection: postsCollection,
            execute: async (collection) => {
                if (!source.id) {
                    throw Error("Empty Id")
                }

                const cleanObject: any = {}
                if (source.description) {
                    cleanObject.description = source.description
                }
                if (source.image_alt) {
                    cleanObject.image_alt = source.image_alt
                }
                if (source.image_url) {
                    cleanObject.image_url = source.image_url
                }

                const objId = {
                    _id: ObjectId.createFromHexString(source.id)
                }
                const result = await collection
                    .updateOne(
                        objId,
                        { $set: cleanObject }
                    )
                cleanObject.id = source.id

                return {
                    data: source
                }
            }
        })
    }
}
