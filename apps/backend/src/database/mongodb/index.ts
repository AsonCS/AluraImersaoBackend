import { MongoClient } from "mongodb"

import { Result } from "../../core"
import { MongoDb } from "../../database"

import imersaoInstabytes from "./ImersaoInstabytes"
import sample from "./Sample"

const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const uri = `mongodb+srv://${user}:${password}@cluster0.zpxlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

let client: MongoClient | null = null

async function getClient(): Promise<MongoClient> {
    if (client) {
        return client
    }

    const cl = new MongoClient(uri)
    await cl.connect()
    console.log('Mongo MongoClient connect')

    client = cl

    return cl
}

export interface Collection {
    insertOne: (
        source: any
    ) => Promise<any>
    find: () => FindResult
    findOne: (
        filter: any
    ) => Promise<any>
    updateOne: (
        filter: any,
        source: any
    ) => Promise<any>
}

interface FindResult {
    toArray: () => Promise<any[]>
}

export async function collection<T, U extends Result<T>>({
    db, collection, execute
}: {
    db: string,
    collection: string,
    execute: (
        collection: Collection
    ) => Promise<U>
}): Promise<U> {
    let client: MongoClient | null = null
    let result: U
    try {
        client = await getClient()

        const database = client.db(db)
        result = await execute(
            database.collection(collection)
        )
    } catch (e: any) {
        console.error(e)
        result = {
            error: e
        } as U
    } finally {
        //await client?.close()
    }

    return result
}

const db: MongoDb = {
    sample: {
        getMovieBackToTheFuture: () => sample.getMovieBackToTheFuture()
    },
    imersaoInstabytes: {
        getAll: () => imersaoInstabytes.getAll(),
        insertOne: (source) => imersaoInstabytes.insertOne(source),
        updateOne: (source) => imersaoInstabytes.updateOne(source)
    }
}
export default db
