<template>
  <Layout>
    <tabs :data-source="recordTypeList" :value.sync="initialType"
          classPrefix="xxx"
    />
    <div class="gatherList">
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">
            <span>{{beautify(group.title)}}</span>
            <span>￥{{group.total}}</span>
          </h3>
          <ol>
            <li v-for="(item,index) in group.items" class="record" :key="index">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noRecord">目前没有相关记录</div>
    </div>
  </Layout>
</template>


<script lang="ts">
  import Tabs from '@/components/Tabs.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import typeList from '@/constants/typeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  type Result = {
    title: string;
    items: RecordItem[];
    total?: number;
  }[]

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    get groupedList() {
      const {recordList} = this;

      const newRecordList = clone(recordList)
        .filter(r => r.types === this.initialType)
        .sort((a, b) =>
          dayjs(b.createdAT).valueOf() - dayjs(a.createdAT).valueOf());

      if (newRecordList.length === 0) {return [] as Result;}

      const result: Result = [{title: dayjs(newRecordList[0].createdAT).format('YYYY-M-D'), items: [newRecordList[0]]}];
      for (let i = 1; i < newRecordList.length; i++) {
        const last = result[result.length - 1];
        if (dayjs(newRecordList[i].createdAT).isSame(last.title, 'day')) {
          last.items.push(newRecordList[i]);
        } else {
          result.push({title: dayjs(newRecordList[i].createdAT).format('YYYY-M-D'), items: [newRecordList[i]]});
        }
      }
      result.map(group =>{
        group.total = group.items.reduce((sum, item) => {
         return sum += item.amount;
        },0)
        });
      return result;
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，');

    }

    beautify(string: string) {
      const now = dayjs();
      if (dayjs(string).isSame(now, 'day')) {
        return '今天';
      } else if (dayjs(string).isSame(now.valueOf() - 86400 * 1000, 'day')) {
        return '昨天';
      } else if (dayjs(string).isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (dayjs(string).isSame(now, 'year')) {
        return dayjs(string).format('M月D日');
      } else {
        return dayjs(string).format('YYYY年M月D日');
      }
    }

    initialType = '-';
    recordTypeList = typeList;
  }


</script>

<style lang="scss" scoped>
  ::v-deep {
    .xxx-tab-item {
      background: #c4c4c4;

      // &.selected {
      //   background: white;
      // }

      &::after {
        // display: none;
        background: #409eff;
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
    @extend %item;
  }

  .record {
    @extend %item;
    background: white;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
  .noRecord{
    padding: 100px;
    text-align: center;
  }
</style>