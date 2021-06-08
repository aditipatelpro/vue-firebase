<template>
  <v-dialog
    v-model="registerDialog"
    persistent
    max-width="350"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ meetupRegisteredByUser ? 'Opt-out' : 'Attend' }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title v-if="meetupRegisteredByUser">
        Unregister from meetup?
      </v-card-title>
      <v-card-title v-else>
        Register for meetup?
      </v-card-title>
      <v-divider />
      <v-card-text>
        You can always change your decision later on.
      </v-card-text>
      <v-card-actions>
        <v-btn
          plain
          class="green--text darken-1"
          @click="onConfirm"
        >
          Confirm
        </v-btn>
        <v-btn
          plain
          class="red--text darken-1"
          @click="registerDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetupId'],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    meetupRegisteredByUser() {
      return this.$store.getters.user.registeredMeetups
        .findIndex((meetupId) => meetupId === this.meetupId) >= 0;
    },
  },

  methods: {
    onConfirm() {
      if (this.meetupRegisteredByUser) this.$store.dispatch('unregisterUserFormMeetup', this.meetupId);
      else this.$store.dispatch('registerUserForMeetup', this.meetupId);
      this.registerDialog = false;
    },
  },
};
</script>
