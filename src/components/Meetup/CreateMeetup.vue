<template>
  <v-container>
    <div class="d-flex justify-center">
      <h3 class="blue-grey--text">
        Create a New Meetup
      </h3>
    </div>

    <v-row>
      <v-col
        cols="12"
        sm="7"
        offset-sm="3"
      >
        <div class="justify-center">
          <v-form @submit.prevent="onCreateMeetup">
            <v-text-field
              id="title"
              v-model="title"
              name="title"
              label="Title"
              required
            />

            <v-text-field
              id="location"
              v-model="location"
              name="location"
              label="Location"
              required
            />

            <v-text-field
              id="image-url"
              v-model="imageUrl"
              name="imageUrl"
              label="Image URL"
              required
            />

            <img
              :alt="imageUrl"
              :src="imageUrl"
              height="150"
            >

            <v-textarea
              id="description"
              v-model="description"
              name="description"
              label="Description"
              required
            />

            <h4>Choose a Date and Time</h4>

            <div>
              <v-date-picker
                v-model="date"
                class="mr-1"
                width="245"
              />
              <v-time-picker
                v-model="time"
                class="ml-1"
                width="245"
              />
            </div>

            <div class="d-flex justify-center">
              <v-btn
                color="primary"
                :disabled="!formIsValid"
                type="submit"
              >
                Create Meetup
              </v-btn>
            </div>
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
    title: '',
  }),

  computed: {
    formIsValid() {
      return this.description !== '' && this.imageUrl !== '' && this.location !== '' && this.title !== '';
    },

    submittableDateTime() {
      const date = new Date(this.date);

      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    },
  },

  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }

      const meetupData = {
        date: this.submittableDateTime,
        description: this.description,
        imageUrl: this.imageUrl,
        location: this.location,
        title: this.title,
      };

      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    },
  },
};
</script>
