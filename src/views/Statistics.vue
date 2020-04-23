<template>
  <Layout>
    <tabs :data-source="recordTypeList" :value.sync="initialType"
          classPrefix="xxx"
    />
    <tabs :data-source="intervalList" :value.sync="interval"
          class-prefix="interval"/>
    <div class="gatherList">
      <ol>
        <li v-for="(group) in result" :key="group.title">
          <h3 class="title">{{beautify(group.title)}}</h3>
          <ol>
            <li v-for="item in group.items" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes" >{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>


<script lang="ts">
  import Tabs from '@/components/Tabs.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/constants/typeList';
  import intervalList from '@/constants/intervalList';
  import dayjs from 'dayjs'

  type HashValues = {
    title: string,
    items: RecordItem[]
  }

  @Component({
    components: {Tabs}
  })
  export default class statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    get result() {
      const {recordList} = this;
      const hashTable: { [key: string]: HashValues } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = (recordList[i].createdAT)!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    tagString(tags:Tag[]) {
     return tags.length===0? '无': tags.toString();
    }

    beautify(string:string){
      const now = dayjs()
      if (dayjs(string).isSame(now,'day')){
        return '今天'
      }else if (dayjs(string).isSame(now.valueOf()-86400*1000,'day')){
        return '昨天'
      }else if (dayjs(string).isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else if (dayjs(string).isSame(now,'year')){
        return dayjs(string).format('M月D日')
      }else{
        return dayjs(string).format('YYYY年M月D日')
      }
    }

    initialType = '-';
    interval = 'day';
    recordTypeList = typeList;
    intervalList = intervalList;
  };


</script>

<style lang="scss" scoped>
  ::v-deep {
    .xxx-tab-item {
      background: #c4c4c4;

      &.selected {
        background: white;
      }

      &::after {
        display: none;
      }
    }

    .interval-tab-item {
      font-size: 18px;
      padding: 7px 0;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    @extend %item
  }

  .record {
    @extend %item;
    background: white;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
</style>