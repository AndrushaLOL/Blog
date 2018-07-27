<template>
  <div id="app">
    <v-app>
    <Header />
  <v-content>
    <v-container fluid fill-height class="grey lighten-4">
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
  </v-app>
  </div>
</template>

<script>
import Header from '@/components/Header'
import BackendLess from 'backendless'

export default {
  name: 'App',
  components: {
    Header
  },
  mounted () {
    BackendLess.UserService.getCurrentUser()
      .then((user) => {
        if (user) {
          this.$router.push({name: "Login"})
        }
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
