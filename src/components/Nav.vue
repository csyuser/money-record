<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <icon name="label"/>
      标签
    </router-link>
    <router-link to="statistics" class="item" active-class="selected">
      <icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

    > .item {
      width: 33.3333333%;
      display: flex;
      justify-content: center;  //指定方向上居中
      align-items: center;  //指定方向的垂直方向居中
      font-size: 12px;
      flex-direction: column;
      padding: 3px 0;
    }
      .icon{
        width:32px;
        height:32px;
      }
    >.selected{
      color: red;
    }
  }
</style>