<template>
  <Layout class-prefix="layout">
    <NumberPad :value="record.amount"
               @update:value="onUpdateAmount"
               @submit="saveRecord"
    />
    <tabs :data-source="typeList" :value.sync="record.types"/>
    <div class="inputNotes">
      <FormItem field-name="备注"
                placeholder="请输入备注"
                :value="record.notes"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags @update:value="record.tags=$event"
          :is-submit="isSubmit"
          @update:isSubmit="onUpdateIsSubmit"

    />
  </Layout>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tags from '@/components/Money/Tags.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Button from '@/components/Button.vue';
  import Tabs from '@/components/Tabs.vue';
  import typeList from '@/constants/typeList';

  @Component({
    components: {Tabs, Button, NumberPad, FormItem, Tags},
    computed: {
      recordList() {
        return this.$store.state.recordList;
      }
    }
  })

  export default class Money extends Vue {

    record: RecordItem = {
      tags: [], notes: '', types: '-', amount: 0
    };

    isSubmit: boolean = false;

    typeList = typeList;

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    onUpdateTags(value: Tag[]) {
      this.record.tags = value;
    }


    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: number) {
      this.record.amount = value;
    }

    onUpdateIsSubmit(value: boolean) {
      this.isSubmit = value;
    }

    saveRecord() {
      if (this.record.tags.length <= 0) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecordList', this.record);
      this.record.notes = '';
      this.isSubmit = true;
      // this.$refs.tagComponents.selectedTags = [];
    }

  };
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .inputNotes {
    background: #f5f5f5;
    padding: 11px;
  }
</style>