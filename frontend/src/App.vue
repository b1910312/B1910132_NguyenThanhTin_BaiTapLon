<template>
  <div id="app">
       <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      currentUser: null
    };
  },
  methods: {
    logout() {
      console.log("logout");
    },
  }
}
</script> 


<style>

</style>   