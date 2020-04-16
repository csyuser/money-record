<template>
  <Layout>
    <div class="tagList">
      <router-link class="tags"
                   :to="`/label/edit/${tag.id}`"
                   v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span>
        <icon name="right"/>
      </router-link>
    </div>
    <div class="addTags-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button}
  })
  export default class Labels extends Vue{
    tags=tagListModel.fetch()
  createTag(){
    const name = window.prompt('请输入标签名')
    if (name){
     const message = tagListModel.create(name)
      if (message==='duplicated'){
        window.alert('标签名重复了')
      }else if (message==='success'){
        window.alert('添加标签成功')
      }
    }
  }
  };
</script>

<style lang="scss" scoped>

  .tagList {
    background: white;
    padding-left: 16px;

    > .tags {
      min-height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;

      svg {
        margin-right: 16px;
        color: #333333;
        width: 18px;
        height: 18px;
      }
    }

  }

  .addTags-wrapper {
    text-align: center;  //内联元素水平居中方法
    padding-top: 40px;
    > .addTags {
      border: none;
      background: #767676;
      color: white;
      padding: 9px 16px;
      border-radius: 4px;
    }

  }
</style>