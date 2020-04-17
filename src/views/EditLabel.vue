<template>
  <layout>
    <div class="nav-bar">
      <icon class="leftIcon"
            name="left"
            @click="back"
      />
      <span>编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名"
                placeholder="请输入标签"
                :value="tag.name"
                @update:value="updateTag"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import tagListModel from '@/models/tagListModel';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class editLabel extends Vue {
    tag?: { id: string, name: string } = undefined;
    @Prop({default: ''}) readonly value!: string;

    created() {
      const id = this.$route.params.id;
      tagListModel.fetch();
      const tags = tagListModel.data;
      const tag = tags.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    updateTag(name: string) {
      if (this.tag) {
        const result = tagListModel.update(this.tag.id, name);
        if (result === 'duplicated') {
          window.alert('标签名重复，请重新输入');
          return;
        }
        tagListModel.save();
      }
    }

    removeTag() {
      if (this.tag &&  window.removeTag(this.tag.id)) {
       this.back()
      }
    }

    back() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .nav-bar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .leftIcon {
      width: 20px;
      height: 20px;
    }

    > .rightIcon {
      width: 20px;
      height: 20px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>