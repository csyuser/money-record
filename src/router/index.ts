import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',  //设置默认的路径为根路径，访问money组件
    component: Money
  },
  {
    path: '/money',  //若访问的路径为'/money'，则展示Money组件，显示的位置由router view 确定（在App.vue）
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/label/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFound
  },

];

const router = new VueRouter({
  routes
});

export default router;
