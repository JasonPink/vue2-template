<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">{{ 'Home' | formatNum2 }}</router-link>
      <router-link to="/about">{{ 'About' | formatNum }}</router-link>
      <el-button v-copy="'email'">复制ss</el-button> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    test() {
      console.log(123)
    },
  },
}
</script>
<style lang="scss">
@import './styles/index.scss';
html,
body {
  height: 100%;
  margin: 0;
}
#app {
  background: $bgColor;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
