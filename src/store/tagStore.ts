
import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore =  {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },
  createTag(name:string) {
    const names = this.tagList.map(e => e.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      return 'duplicated';
    }
    const id=createId().toString()
    this.tagList.push({id: id, name: name});
    this.saveTags();
    window.alert('添加标签成功');
    return 'success';
  },
  removeTag(id:string) {
    const tag = this.tagList.filter(item => item.id === id)[0];
    const index = this.tagList.indexOf(tag);
    if (tag) {
      this.tagList.splice(index,1)
      this.saveTags()
    }
    return true
  },
  updateTag(id:string, name:string) {
    const idList = this.tagList.map(item => item.id);
    const nameList = this.tagList.map(item => item.name);
    const tag = this.tagList.filter(item => item.id === id)[0];
    if (name===''){return 'not find'}
    if (idList.indexOf(id) >= 0) {
      console.log('nameList')
      console.log(nameList)
      console.log(nameList.indexOf(name))
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not find';
    }
  },
  findTag(id:string){
    return  this.tagList.filter(t => t.id === id)[0]
  },
}
tagStore.fetchTags()

export default  tagStore
