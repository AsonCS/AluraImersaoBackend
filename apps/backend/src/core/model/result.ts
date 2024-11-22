export interface Result<T> {
    error?: any | null
}

export interface ResultArray<T> extends Result<T> {
    data?: T[] | null
}

export interface ResultSingle<T> extends Result<T> {
    data?: T | null
}
