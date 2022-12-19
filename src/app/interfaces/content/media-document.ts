import { Formats } from "./formats"

export interface MediaDocument {
  data: {
    id: number,
    attributes: {
        name: string,
        alternativeText: string,
        caption: string,
        width: number,
        height: number,
        formats: Formats,
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: string,
        provider: string,
        provider_metadata: string,
        createdAt: string,
        updatedAt: string
    }
}
}
