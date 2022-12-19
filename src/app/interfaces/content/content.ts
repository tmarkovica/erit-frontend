import { MediaDocument } from "./media-document"

export interface Content {
  id: number,
  attributes: {
    title: string,
    category: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    editor: string,
    document: MediaDocument,
    cover_image: MediaDocument,
    approval: {
      data: {
        id: 2,
        attributes: {
          approved: boolean,
        }
      }
    }
  }
}
