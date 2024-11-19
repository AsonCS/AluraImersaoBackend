import database from "@/database"
import { Response } from "../"

export default function get(): Response {
    const result = database
        .postTable
        .getAll()

    if (result.error) {
        return {
            error: result.error,
            status: 500
        }
    } else {
        return {
            data: result.data,
            status: 200
        }
    }
}
