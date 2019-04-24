<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #303238;
  height: 100%;
  padding: 0 3.5% 0;
  width: 93%;
}
body,html{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
