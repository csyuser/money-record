import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecordList(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAT = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功');
    },
    findTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      store.commit('fetchTags');
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      const nameList = state.tagList.map(item => item.name);
      const tag = state.tagList.filter(item => item.id === id)[0];
        if (idList.indexOf(id) >= 0) {
          if (nameList.indexOf(name) >= 0) {
            window.alert('标签名重复');
          } else{
            tag.name = name;
            store.commit('saveTags');
          }
        }
    },
    removeTag(state,id:string) {
      store.commit('fetch')
      const tag = state.tagList.filter(item => item.id === id)[0];
      const index = state.tagList.indexOf(tag);
      if (tag) {
        state.tagList.splice(index,1)
        store.commit('saveTags')
      }
      return true
    },
  },
  actions: {},
  modules: {}
});


export default store;