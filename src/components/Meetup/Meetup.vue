<template>
  <v-container>
    <v-card v-if="meetup">
      <v-card-title>
        {{ meetup.title }}
        <template v-if="userIsCreator">
          <v-spacer />
          <app-edit-meetup-details-dialog :meetup="meetup" />
        </template>
      </v-card-title>

      <v-img
        :src="meetup.imageUrl"
        height="400px"
      />

      <v-card-subtitle class="pb-0">
        {{ meetup.date | date }} - {{ meetup.location }}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>
          {{ meetup.description }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <app-register-meetup-dialog
          v-if="userIsAuthenticated && !userIsCreator"
          :meetup-id="meetup.id"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },

    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },

    userIsCreator() {
      if (!this.userIsAuthenticated) return false;
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
  },
};
</script>
