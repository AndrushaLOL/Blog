<template>
	<v-layout row>
		<v-flex xs6 offset-xs3>
		  <div class='white elevation-2'>
		  	<v-toolbar flat dense class = "blue lighten-1" dark>
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
	  	  <v-btn class="blue lighten-1 white--text" @click="Login()">Login</v-btn>
	  	  </div>
		  </div>
		</v-flex>
	  
	</v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
	name: 'Register',
	data () {
		return {
			email: '',
			password: '',
			error: null
		}
	},
	methods: {
		async Login () {
			try {
			await AuthenticationService.login({
				email: this.email,
				password: this.password
			})

			this.email = ''
			this.password = ''
			} catch (e) {
				this.error = e.response.data.error
			}
		}
	}
}
</script>