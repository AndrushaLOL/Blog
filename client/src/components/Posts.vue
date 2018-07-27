<template>
<v-layout row>
  <v-flex xs6 offset-xs3>
  <div class="white elevation-2 mb-4 px-4 py-4" >
    <v-text-field
      label="input title"
      v-model="title"
    ></v-text-field>
    <v-textarea
      name="input-7-1"
      label="Input your text"
      v-model="post"
    ></v-textarea>
    <v-btn color="info" @click="save()">Add new Post</v-btn>
  </div>
  <!--</v-flex>-->
  <!--<v-flex>-->
  <transition-group name="zoomLeft">
    <v-card v-for="post in posts" :key="post.objectId" class="mb-4">
      <v-card-title class="evaluation-2 font-weight-bold">
        {{ post.title }}
        <v-spacer></v-spacer>
          <v-spacer></v-spacer>
                 <v-btn icon small color="red white--text" @click="removePost(post.objectId)">
              <v-icon>remove</v-icon>
            </v-btn>
      </v-card-title>
      <v-card-text>
        {{ post.post }}
      </v-card-text>
    </v-card>
  </transition-group>
  </v-flex>
</v-layout>
</template>

<script>
  import Backendless from 'backendless'

    export default {
        name: "Posts",
        data () {
          return {
            posts: [],
            title: '',
            post: ''
          }
        },
      computed: {
          user () {
            return Backendless.UserService.getCurrentUserSync() || null
          }
      },
        mounted () {
          this.fetch()
        },
        methods: {
          save () {
            Backendless.Data.of("Posts").save( {
              email: this.user.email,
              title: this.title,
              post: this.post
            })
              .then(() => this.fetch())
              .catch(err => console.log(err))
          },
          fetch () {
          Backendless.UserService.getCurrentUser()
            .then((user) => {
              if (user) {
                const whereClause = "email = '" + (user.email || "andrey@mail.ru")+ "'"
                const query = Backendless.DataQueryBuilder.create().setWhereClause( whereClause )

                Backendless.Persistence.of("Posts").find(query)
                  .then( (posts) => {
                    this.posts = posts
                    console.log(this.posts)
                  })
              }
            })
            .catch((err) => console.log(err))
        },
        removePost (id) {
          Backendless.Data.of("Posts").remove( {objectId: id} )
            .then(( timestamp ) => {
              console.log("Deleted at: " + timestamp)
              this.fetch()
            })
        }
      }
    }
</script>

<style scoped>

</style>
