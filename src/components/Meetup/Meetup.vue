<template>
  <v-container>
      <v-card>
        <v-card-title>
          {{ meetup.title }}
        </v-card-title>

        <v-img
          :src="meetup.imageUrl"
          height="400px"
        ></v-img>

        <v-card-subtitle class="pb-0">
          {{ meetup.date | date}} - {{meetup.location}}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>
            {{meetup.description}}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
