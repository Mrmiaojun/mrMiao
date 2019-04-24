<template>
  <div class="headBox">
      <div class="iconfont icon-left leftBtn" @click="toBack">
      </div>
      {{title}}
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: ['title'],
  methods: {
    toBack() {
      history.go(-1)
    }
  }
}

</script>
<style>
.headBox{
  color: white;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  position: relative;
  font-size: 1.4rem;
}
.leftBtn{
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
</style>
