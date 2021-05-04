<template>
  <v-container>
    <div class="d-flex justify-center">
      <h3 class="blue-grey--text">Create a New Meetup</h3>
    </div>

    <v-row>
      <v-col cols="12" sm ="7" offset-sm="3">
        <div class="justify-center">
          <v-form @submit.prevent="onCreateMeetup">
            <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required
            ></v-text-field>

            <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required
            ></v-text-field>

            <v-text-field
              name="imageUrl"
              label="Image URL"
              id="image-url"
              v-model="imageUrl"
              required
            ></v-text-field>

            <img :src="imageUrl" height="150">

            <v-textarea
              name="description"
              label="Description"
              id="description"
              v-model="description"
              required
            ></v-textarea>

            <h4>Choose a Date and Time</h4>

            <v-date-picker v-model="date"></v-date-picker>
            <v-time-picker v-model="time"></v-time-picker>

            <v-btn
              color="primary"
              :disabled="!formIsValid"
              type="submit"
            >Create Meetup
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: '',
    description: '',
    location: '',
    imageUrl: '',
    time: new Date(),
    title: ''
  }),

  computed: {
    formIsValid () {
      return this.description !== '' && this.imageUrl !== '' && this.location !== '' && this.title !== ''
    },

    submittableDateTime () {
      const date = new Date(this.date)

      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }

      return date
    }
  },

  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }

      const meetupData = {
        date: this.submittableDateTime,
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
