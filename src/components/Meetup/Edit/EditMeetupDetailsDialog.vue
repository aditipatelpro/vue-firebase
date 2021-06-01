<template>
  <v-dialog
    v-model="editDialog"
    persistent
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        fab
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark>
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Edit Meetup
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field
          id="title"
          v-model="editedTitle"
          name="title"
          label="Title"
          required
        />

        <v-textarea
          id="description"
          v-model="editedDescription"
          name="description"
          label="Description"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          plain
          class="blue--text"
          @click="onSaveChanges"
        >
          Save
        </v-btn>
        <v-btn
          plain
          class="blue--text"
          @click="editDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      editedDescription: this.meetup.description,
      editDialog: false,
      editedTitle: this.meetup.title,
    };
  },

  methods: {
    // eslint-disable-next-line consistent-return
    onSaveChanges() {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return false;
      }
      this.editDialog = false;
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
  },
};
</script>
