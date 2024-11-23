import { ApiResponse, Post, ResultSingle } from "../../core";

import { Route } from "..";
import generateDescription from "../../service/gemini";
import { FileSystem } from "../../file_system";
import { MongoDb } from "../../database";

async function get(
    db: MongoDb,
    fs: FileSystem,
    params: any
): Promise<ApiResponse> {
    const postId = params?.id
    if (!postId) {
        return {
            error: 'Empty Id',
            status: 404
        }
    }

    let result: ResultSingle<Partial<Post>>
    let generatedText = ''
    try {
        const buffer = fs.readFile(`./uploads/${postId}.png`)
        generatedText = await generateDescription(buffer)
        const post = JSON.parse(generatedText)
        result = await db.imersaoInstabytes
            .updateOne({
                description: post.description,
                id: postId,
                image_alt: post.image_alt
            })
    } catch (e: any) {
        console.error(e)
        result = {
            error: 'Error'
        }
    }

    if (result.error) {
        return {
            error: generatedText || 'Error',
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}

export default function gemini(
    db: MongoDb,
    fs: FileSystem
): Route {
    return {
        methods: [
            {
                handler: (params) => get(db, fs, params),
                method: 'get'
            }
        ],
        route: '/api/gemini/generate_description/:id'
    }
}
