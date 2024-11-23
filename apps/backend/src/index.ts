import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path from 'path'

import routes from './api'
import { mongoDb, sqliteDb } from './database'
import fs from './file_system'


const app = express()
// Env files on
// https://drive.google.com/drive/folders/10yHm8Rfv2ouf7ZE6tQr2RS8BJrA9X7_z?usp=drive_link
const port = process.env.PORT

app.use(express.json())
app.use(express.static(
    `${path.resolve()}/src/public`
))
app.use(express.static(
    `${path.resolve()}/uploads`
))
app.use(cors({
    origin: process.env.HOST_FRONT,
    optionsSuccessStatus: 200
}))
routes(app, fs, mongoDb, sqliteDb)

app.listen(
    port,
    /*() => {
        console.log(`Server listening on ${port}`)
    } // */
)
