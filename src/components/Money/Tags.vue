<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{selected:selectedTags.indexOf(tag)>=0} "
        @click="toggle(tag)"
      >{{tag.name}}</li>
    </ul>
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <div class="dialog">
      <el-dialog title="请输入标签名" :visible.sync="addTagVisible" width="80%" >
        <el-input v-model="newTagName" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addTagVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTag">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends Vue {
  // tagList=store2.fetchTags()
  selectedTags: Tag[] = [];
  addTagVisible = false;
  newTagName = "";

  @Prop(Boolean) isSubmit!: boolean;

  @Watch("isSubmit")
  onIsSubmitChanged() {
    if (this.isSubmit) {
      this.selectedTags = [];
    }
    this.$emit("update:isSubmit", false);
  }

  created() {
    this.$store.commit("fetchTags");
  }

  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }

//新增标签
  create() {
    this.addTagVisible = true;
  }
  addTag(){
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
.tags {
  background: white;
  font-size: 14px;
  padding: 16px 16px 6px 16px;
  flex-grow: 1;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 18px;
      margin-right: 12px;
      margin-bottom: 10px;

      &.selected {
        color: white;
        background: darken($bg, 40%);
      }
    }
  }

  > .new {
    padding-top: 8px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 3px;
    }
  }
  > .dialog{
    > .el-dialog{
      border: 1px solid red;
    }
    
  }
}
</style>