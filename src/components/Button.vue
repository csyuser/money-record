<template>
  <button class="addTags"
          @click="$emit('click',$event)"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Button extends Vue {

  }
</script>

<style lang="scss" scoped>
  .addTags {
    border: none;
    background: #767676;
    color: white;
    padding: 9px 16px;
    border-radius: 4px;
  }
</style>