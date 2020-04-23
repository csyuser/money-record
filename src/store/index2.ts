import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store2 = {
  count: 0,
  addCount() {
    this.count += 1;
  },
  //recordListModel封装
  ...recordStore,

//tagListModel封装
  ...tagStore
};
export default store2;