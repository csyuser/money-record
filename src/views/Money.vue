<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value="record.amount"
               @update:value="onUpdateAmount"
               @submit="saveRecord"
    />
    <Types :value.sync="record.types"/>
    <div class="notes">
      <FormItem  field-name="备注"
                 placeholder="请输入备注"
                 @update:value="onUpdateNotes"/>
    </div>

    <Tags @update:value="onUpdateTags" :data-source.sync="tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  const recordList2 = recordListModel.fetch()
  const tagList = tagListModel.fetch()

  if (recordListModel.getVersion() === '0.0.2') {
    recordList2.forEach((item: RecordItem) => {
      item.createdAT = new Date(2020, 1, 1);
    });
    recordListModel.save(recordList2);
  }
  window.localStorage.setItem('version', '0.0.2');



  @Component({
    components: {NumberPad, Types, FormItem, Tags}
  })
  export default class Money extends Vue {

    tags = tagList;
    recordList: RecordItem[] = recordList2;
    record: RecordItem = {
      tags: [], notes: '', types: '-', amount: '0'
    };

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = value;
    }

    saveRecord() {
      const record2= recordListModel.clone(this.record);
      record2.createdAT = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordChanged() {
      recordListModel.save(this.recordList);
    }
  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
.notes{
  background: #f5f5f5;
  padding: 11px;
}
</style>