<template>
  <Layout class-prefix="layout">
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
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Types from '@/components/Money/Types.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';


  @Component({
    components: {NumberPad, Types, FormItem, Tags}
  })
  export default class Money extends Vue {

    tags = window.tagList;
    recordList = window.recordList;
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
      window.createRecordList(this.record);
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