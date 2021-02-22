export class Service {
    id: number
    imageUrl: string
    description: string
    docId: string
    created: Date
    updated: Date
    value: string

    constructor(json: any) {
        this.id = json.id
        this.imageUrl = json.url_image
        this.description = json.description
        this.docId = json.doc_id
        this.created = new Date(json.created)
        this.updated = new Date(json.updated)
        this.value = json.value
    }
}
