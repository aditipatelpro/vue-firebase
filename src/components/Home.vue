<template>
  <v-container>

    <div class="d-flex justify-center mb-6">
      <v-btn
        class="text-xs-center text-sm-right mx-4"
        color="primary"
        large
        router to="/meetups"
      >
        Explore Meetups
      </v-btn>

      <v-btn
        class="text-xs-center text-sm-right"
        color="primary"
        large
        router to="/meetup/new"
      >
        Organize Meetups
      </v-btn>
    </div>

    <div class="d-flex justify-center">
      <v-carousel>
        <v-carousel-item
          v-for="meetup in meetups"
          :key="meetup.id"
          :src="meetup.imageUrl"
          reverse-transition="fade-transition"
          transition="fade-transition"
          @click="onLoadMeetup(meetup.id)"
        ></v-carousel-item>
      </v-carousel>
    </div>

    <div class="text-xs-center">
      <p>Join awesome meetups</p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },

  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>
