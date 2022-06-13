<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="123" /> -->
    <!-- <infinite-list :listData="list"></infinite-list> -->
    <infinite-list :listData="list" :estimatedItemSize="100" v-slot="slotProps">
      <Item :item="slotProps.item" />
    </infinite-list>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@comp/HelloWorld.vue'
import InfiniteList from '@comp/InfiniteList'
import Item from '@comp/InfiniteList/Item'
import faker from 'faker'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    InfiniteList,
    Item,
  },
  data() {
    return {
      list: new Array(100).fill().map((x, i) => {
        return {
          id: i + 1,
          value: faker.lorem.sentences(),
        }
      }),
    }
  },
  mounted() {
    console.log(this.list)
  },
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
