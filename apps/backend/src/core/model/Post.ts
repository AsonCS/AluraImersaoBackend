export default interface Post {
    description: string
    id: string
    image_alt: string
    image_url: string
}

export function cleanPost(
    source: Partial<Post>,
    {
        checkId = true
    }: {
        checkId: boolean
    }
): any {
    if (!source.description) {
        throw Error("Empty description")
    }
    if (checkId && !source.id) {
        throw Error("Empty Id")
    }
    if (!source.image_alt) {
        throw Error("Empty Image Alt")
    }
    if (!source.image_url) {
        throw Error("Empty Image Url")
    }

    return {
        description: source.description,
        id: source.id,
        image_alt: source.image_alt,
        image_url: source.image_url
    }
}
