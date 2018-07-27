<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <div class='white elevation-2'>
        <v-toolbar flat dense class="blue lighten-1" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4">
          <v-text-field
            label="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="password"
            v-model="password"
          ></v-text-field>
          <v-btn class="blue lighten-1 white--text" @click="loginUser()">Login</v-btn>
        </div>
      </div>
    </v-flex>

  </v-layout>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import Backendless from 'backendless'


  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        error: null,
        stayLoggedIn: true
      }
    },
    methods: {
      loginUser() {
        var loggedInUser = Backendless.UserService.login(this.email, this.password, this.stayLoggedIn).then((loggedInUser) => {
          console.log("User has been logged in - " + loggedInUser.email);
          this.$router.push({name: "Posts"})
        });

      }
    }
  }
</script>
