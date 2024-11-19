import database from "@/database"
import { Response } from "../"
import { Post } from '@/core'

export default function get(
    source: Partial<Post>
): Response {
    const result = database
        .postTable
        .insert(source)

    if (result.error) {
        return {
            error: result.error,
            status: 500
        }
    } else {
        return {
            data: result,
            status: 200
        }
    }
}
