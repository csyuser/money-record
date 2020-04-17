import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name) {
    const names = this.data.map(e => e.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id=createId().toString()
    this.data.push({id: id, name: name});
    this.save();
    return 'success';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    const nameList = this.data.map(item => item.name);
    const tag = this.data.filter(item => item.id === id)[0];
    if (name===''){return 'not find'}
    if (idList.indexOf(id) >= 0) {
      console.log('nameList')
      console.log(nameList)
      console.log(nameList.indexOf(name))
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not find';
    }
  },
  remove(id) {
    const tag = this.data.filter(item => item.id === id)[0];
    const index = this.data.indexOf(tag);
    if (tag) {
      this.data.splice(index,1)
      this.save()
    }
    return true
  },
};
export default tagListModel;