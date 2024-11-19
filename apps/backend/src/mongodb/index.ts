import { MongoClient } from "mongodb"

import Sample from "./Sample"

const user = process.env.MONGODB_USER
const password = process.env.MONGODB_PASSWORD
const uri = `mongodb+srv://${user}:${password}@cluster0.zpxlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri)

const sample = new Sample()

export interface ResultQuery<T> {
    data?: Array<T>
    error?: any
}

export default {
    sample: {
        getMovieBackToTheFuture: () => sample.getMovieBackToTheFuture(client)
    }
}
