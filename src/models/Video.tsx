export class Video {
    id: number
    title: string
    description: string
    videoUrl: string
    tags: string[]

    constructor(json: any) {
        this.id = json.id
        this.title = json.title
        this.description = json.description
        this.videoUrl = json.videoUrl
        this.tags = json.tags
    }

    getTags(): string {
        let t = ''
        if (this.tags) {
            for (const tag of this.tags) {
                t = `${t} ${tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`}`
            }
        }
        return t.trim()
    }
}
