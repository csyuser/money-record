<template>
  <div>
    <ul class="types">
      <li :class="value==='+'&&'selected'"
          @click="selectType('-')">收入
      </li>
      <li :class="value==='-'&&'selected'"
          @click="selectType('+')">支出
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop() readonly value!:string

    // @Prop(Number) xxx: number | undefined;

    selectType(type: string) {   //type只能是'+'或'-'
      if (type !== '+' && type !== '-') {
        throw  new Error('type is unknown');
      }
      this.$emit('update:value',type)
    }
  }
//以下是js语法
  // export default {
  //   name: 'Types',
  //   data(){
  //     return{
  //       type:'-'  //'-'表示支出，'+'表示收入
  //     }
  //   },
  //   methods: {
  //     selectType(type){   //type只能是'+'或'-'
  //       if(type!=='+'&&type!=='-'){
  //         throw  new Error('type is unknown')
  //       }
  //       this.type=type;
  //     }
  //   },
  // };
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    font-size: 24px;
    display: flex;
    text-align: center;

    li {
      width: 50%;
      padding: 14px 0;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333333;
      }
    }

  }

</style>