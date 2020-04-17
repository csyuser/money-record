import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


//recordListModel封装
window.recordList = recordListModel.fetch()
window.createRecordList= (record)=>{
  return recordListModel.create(record);
}


//tagListModel封装
window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  } else if (message === 'success') {
    window.alert('添加标签成功');
  }
};
window.removeTag = (id) => {
  return (tagListModel.remove(id));
};
window.updateTag=(id,name)=>{
  return  tagListModel.update(id, name)
}
window.findTag=(id)=>{
  return  window.tagList.filter(t => t.id === id)[0]
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

