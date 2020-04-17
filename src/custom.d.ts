type RecordItem = {
  tags: string[]
  notes: string
  types: string
  amount: string
  createdAT?:Date
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[]
  save: () => void
  create: (name: string) => string
  update: (name: string, id: string) => 'success' | 'not find' | 'duplicated'
  remove: (id: string) => boolean
}
type Tag = {
  id: string
  name: string
}

interface Window {
  tagList: Tag[]
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: (id: string, name: string) => 'success' | 'not find' | 'duplicated'
  findTag: (id: string) => Tag
}


