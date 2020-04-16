const localStorageKeyName ='recordList'

const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data:RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  getVersion() {
    return window.localStorage.getItem('version') || '' as string;
  },
  clone(data:RecordItem){
   return  JSON.parse(JSON.stringify(data)) as RecordItem
  }
};
export default recordListModel;


