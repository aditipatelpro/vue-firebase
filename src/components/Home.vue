<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" class="text-xs-center text-sm-right">
        <v-btn large color="primary" router to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col xs="12" sm="6" class="text-xs-center text-sm-left">
        <v-btn large color="primary" router to="/meetup/new">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageURL"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(meetup.id)"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" class="text-xs-center">
        <p>Join awesome meetups</p>
      </v-col>
    </v-row>
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
