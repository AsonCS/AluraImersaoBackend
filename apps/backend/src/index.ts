import express from 'express'
import path from 'path'

import routes from './api'

import './database'
import './mongodb'

const port = process.env.PORT
const publicPath = `${path.resolve()}/src/public`

const app = express()

app.use(express.json());
app.use(express.static(publicPath))
routes(app)

app.listen(
    port,
    /*() => {
        console.log(`Server listening on ${port}`)
    } // */
)
