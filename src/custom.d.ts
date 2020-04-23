type RecordItem = {
  tags: Tag[]
  notes: string
  types: string
  amount: string
  createdAT?:string
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

}

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[]
  currentTag?: Tag
}


