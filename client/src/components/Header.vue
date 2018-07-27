<template>
	<v-toolbar color="primary" fixed>
	  <v-toolbar-title class='white--text' to="HelloWorld.vue">
      <router-link to="/"><span class="white--text">Blog</span></router-link>
	  </v-toolbar-title>
    <v-btn to="/posts" class="info" flat >Browse</v-btn>
	  <v-spacer></v-spacer>
	  <v-toolbar-items>
	    <v-btn color="white" to="Login" flat>Login</v-btn>
	    <v-btn color="white" to="Register" flat>Register</v-btn>
	  </v-toolbar-items>
	</v-toolbar>
</template>

<script>
	export default {
		name: "Header"
	}
</script>
