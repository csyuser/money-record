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
                :value="currentTag.name"
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
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem},
  })
  export default class editLabel extends Vue {
    @Prop({default: ''}) readonly value!: string;

    get currentTag(){
      return this.$store.state.currentTag
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTags')
      this.$store.commit('findTag',id)
      if (!this.currentTag) {
        this.$router.replace('/404')
      }
    }

    updateTag(name: string) {
      if (this.currentTag) {
        this.$store.commit('updateTag',{id:this.currentTag.id,name:name})
      }
    }

    removeTag() {
      this.$store.commit('removeTag',this.currentTag.id)
      this.back();
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