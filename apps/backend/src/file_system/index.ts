import fs from 'fs'

export interface FileSystem {
    readFile: (
        path: string
    ) => Buffer
    renameFile: (
        newPath: string,
        oldPath: string
    ) => void
}

const fileSystem: FileSystem = {
    readFile: (
        path: string
    ): Buffer => {
        return fs.readFileSync(path)
    },
    renameFile: (
        newPath: string,
        oldPath: string
    ) => {
        fs.renameSync(oldPath, newPath)
    }
}
export default fileSystem
