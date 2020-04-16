const localStorageKeyName = 'tagList';
type TagListModel = {
  data: Tag[];
  fetch: () =>Tag[]
  save: () => void
  create: (name: string) => string
}
type Tag={
  id:string
  name:string
}

const tagListModel:TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name) {
    const names = this.data.map(e=>e.name)
    if (names.indexOf(name)>=0){return 'duplicated'}
    this.data.push({id:name,name:name})
    this.save()
    return 'success'
  }
};
export default tagListModel;