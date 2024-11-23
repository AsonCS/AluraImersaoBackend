import { ApiResponse, Post } from "../../../core";
import { MongoDb } from "../../../database";

import { Route } from "../..";
import { ObjectId } from "mongodb";

async function post(
    db: MongoDb,
    files: any
): Promise<ApiResponse> {
    const image = files?.imagem
    if (!image?.name) {
        return {
            error: 'Empty image',
            status: 404
        }
    }

    const postId = new ObjectId().toString()
    const post: Post = {
        description: "upload",
        id: postId,
        image_url: `${process.env.HOST}/${postId}.png`,
        image_alt: "upload"
    }

    try {
        await image.mv(
            `./uploads/${postId}.png`
        )
    } catch (e: any) {
        console.error(e)
        return {
            error: 'Internal error',
            status: 500
        }
    }
    const result = await db
        .imersaoInstabytes
        .insertOne(post)

    if (result.error || !result.data) {
        return {
            error: result.error || 'Error',
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}

export default function upload(
    db: MongoDb
): Route {
    return {
        methods: [
            {
                handler: (files) => post(db, files),
                method: 'post',
                middlewareFileUpload: true
            }
        ],
        route: '/api/upload'
    }
}