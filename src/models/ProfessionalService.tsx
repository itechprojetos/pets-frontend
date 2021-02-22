export class ProfessionalService {
  id: number
  description: string
  created: Date
  updated: Date
  doc_id: string
  url_image: string
  value: string
  customerId: number

  constructor(json: any) {
    this.id = json.id
    this.description = json.description
    this.created = new Date(json.created)
    this.updated = new Date(json.updated)
    this.doc_id = json.doc_id
    this.url_image = json.url_image
    this.value = json.value
    this.customerId = json.customerId
  }
}