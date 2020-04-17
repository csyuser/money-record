import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  getVersion() {
    return window.localStorage.getItem('version') || '' as string;
  },
  create(record:RecordItem){
    const record2:RecordItem= clone(record);
    record2.createdAT = new Date();
    this.data.push(record2);
    this.save()
  }
};
export default recordListModel;


