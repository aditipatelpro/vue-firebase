<template>
  <v-container>
    <div
      v-for="meetup in meetups"
      :key="meetup.id"
      class="mb-4"
    >
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col cols="5">
              <v-img
                :src="meetup.imageUrl"
                height="150px"
              />
            </v-col>

            <v-col>
              <v-card-title>
                {{ meetup.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ meetup.date | date }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  plain
                  :to="'/meetups/' + meetup.id"
                >
                  View Meetup
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>
