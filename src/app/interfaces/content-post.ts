export interface ContentPost {
  data: {
    title: string,
    category: string
    editor: string,
  },
  "files.cover_image": File,
  "files.document": File
}
