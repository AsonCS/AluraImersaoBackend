import { SqliteDb } from "@/database";

import posts from './posts'
import { Route } from "..";

export default function routes(
    db: SqliteDb
): Route[] {
    return [
        posts(db)
    ]
}
