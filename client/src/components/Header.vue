<template>
	<v-toolbar color="primary" fixed>
		<v-toolbar-side-icon></v-toolbar-side-icon>
	  <v-toolbar-title class='white--text' to="HelloWorld.vue">
	    Blog
	  </v-toolbar-title>
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