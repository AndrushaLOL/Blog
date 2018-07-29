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
    <v-btn v-if="!isEditing" color="info" @click="save()">Add new Post</v-btn>
    <v-btn v-if="isEditing" color="info" @click="updatePost()">Update Post</v-btn>

  </div>
  <!--</v-flex>-->
  <!--<v-flex>-->
  <transition-group name="zoomLeft">
    <v-card v-for="post in posts" :key="post.objectId" class="mb-4">
      <v-card-title class="evaluation-2 font-weight-bold">
        {{ post.title }}
        <v-spacer></v-spacer>
        <v-btn icon small color="blue white--text" @click="editPost(post.objectId)">
            <v-icon>edit</v-icon>
        </v-btn>
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
            post: '',
            isEditing: false,
            editPostId: ''
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
          updatePost() {
            Backendless.Data.of("Posts").save( {
              objectId: this.editPostId,
              title: this.title,
              post: this.post
            })
              .then((post) => {
                console.log(`post with objID: ${post.objectId} was updated`)
                this.fetch()
              })
              .catch((err) => console.log(err))
            this.isEditing = false
          },
          save () {
            Backendless.Data.of("Posts").save( {
              email: this.user.email,
              title: this.title,
              post: this.post
              
            })
              .then(() => {
                this.fetch()
                this.title = ''
                this.post = ''
              })
              .catch(err => console.log(err))
          },
          fetch () {
          Backendless.UserService.getCurrentUser()
            .then((user) => {
              if (user) {
                const whereClause = "email = '" + (this.user.email || "andrey@mail.ru")+ "'"
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
        },
        editPost (id) {
          this.editPostId = id
          const context = this
          Backendless.Data.of("Posts").findById( id )
            .then((post) => {
              this.title = post.title
              this.post = post.post
              console.log(post.title)
            })
            .catch((err) => console.log(err))
          this.isEditing = true
        }
      }
    }
</script>
