<template>
  <label class="formItem">
    <span class="name">{{fieldName}}</span>
    <input type="text"
           :value="value"
           @input="onValueChanged($event.target.value)"
           :placeholder="placeholder"
    />
  </label>
</template>


<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue {
    @Prop({default:''}) value!:string
    @Prop({required:true}) fieldName!:string
    @Prop() placeholder?:string

    onValueChanged(value:string){
      this.$emit('update:value',value)
    }
  };

</script>

<style lang="scss" scoped>
  .formItem {
    display: flex;
    font-size: 14px;
    padding: 0 16px;
    align-items: center;

    > .name {
      padding-right: 16px;
    }

    input {
      height: 42px;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }
</style>