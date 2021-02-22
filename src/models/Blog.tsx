export class Blog {
    id: number
    slug: string
    title: string
    text: string
    author: string
    url_image1: string
    url_image2: string
    publishDate: string

    constructor(json: any) {
        this.id = json.id
        this.slug = json.slug
        this.title = json.title
        this.text = json.text
        this.url_image1 = json.url_image1
        this.url_image2 = json.url_image2
        this.author = json.author
        this.publishDate = json.publishDate
    }
}
