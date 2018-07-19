<template>
	<v-layout row>
		<v-flex xs6 offset-xs3>
		  <div class='white elevation-2'>
		  	<v-toolbar flat dense class = "cyan" dark>
		  	  <v-toolbar-title>Register</v-toolbar-title>
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
	  	  <v-btn color="blue lighten-4">Success</v-btn>
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
		async Register () {
			try {
			await AuthenticationService.register({
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