export class Product {
    id: number
    imageUrl: string
    description: string
    sellerName: string
    rate: number | undefined
    price: number | undefined
    bookmarked: boolean

    constructor(json: any) {
        this.id = json.id
        this.imageUrl = json.imageUrl
        this.description = json.description
        this.sellerName = json.sellerName
        this.rate = json.rate
        this.price = json.price
        this.bookmarked = json.bookmarked
    }

    getPrice(): string {
        const p = `${this.price}`
        if (p.indexOf('R$') >= 0) {
            return p
        } else {
            const pAny = this.price as any
            let pr: any = this.price
            if (typeof  pAny === 'string') {
                pr = parseFloat(pAny).toFixed(2)
            }
            return `R$ ${pr}`
        }
    }
}
