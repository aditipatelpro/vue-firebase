<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col cols="12">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="5">
                <v-img
                  :src= "meetup.imageUrl"
                  height="150px"
                ></v-img>
              </v-col>
              <v-col>
                <v-card-title>
                  {{ meetup.title }}
                </v-card-title>
                <v-card-subtitle>
                  {{ meetup.date | date}}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn plain :to="'/meetups/' + meetup.id">
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
