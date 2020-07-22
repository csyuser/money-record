<template>
  <Layout>
    <div class="tagList">
      <router-link class="tags" :to="`/label/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span>
        <icon name="right" />
      </router-link>
    </div>
    <div class="addTags-wrapper">
      <Button @click="create">新建标签</Button>
    </div>
    <div class="dialog">
      <el-dialog title="请输入标签名" :visible.sync="addTagVisible" width="80%">
        <el-input v-model="newTagName" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addTagVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTag">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends Vue {
  // tags = store2.tagList;
  addTagVisible = false;
  newTagName = "";

  beforeCreate() {
    this.$store.commit("fetchTags");
  }

  create() {
    this.addTagVisible = true;
  }
  addTag() {
    this.addTagVisible = false;
    const map: { [key: string]: string } = {
      "tag name duplicated": "标签名重复"
    };
    if (!this.newTagName) {
      return window.alert("请输入标签名");
    }
    this.$store.commit("createTag", this.newTagName);
    if (this.$store.state.createTagError === null) {
      window.alert("标签添加成功");
    } else {
      window.alert(map[this.$store.state.createTagError.message] || "未知报错");
    }
  }
}
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
  text-align: center; //内联元素水平居中方法
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