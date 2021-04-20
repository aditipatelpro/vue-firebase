<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6" offset-md="3">
        <h3 class="blue-grey--text">Create a New Meetup</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col sm="12" md="6" offset-md="3" >
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6" offset-md="3" >
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6" offset-md="3" >
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6" offset-md="3" >
              <img :src="imageUrl" height="150">
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" md="6" offset-md="3" >
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" offset="5">
              <v-btn
                color="primary"
                :disabled="!formIsValid"
                type="submit"
              >Create Meetup
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    description: '',
    location: '',
    imageUrl: '',
    title: ''
  }),

  computed: {
    formIsValid () {
      return this.description !== '' && this.imageUrl !== '' && this.location !== '' && this.title !== ''
    }
  },

  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        date: new Date(),
        description: this.description,
        imageUrl: this.imageUrl,
        location: this.location,
        title: this.title
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>
