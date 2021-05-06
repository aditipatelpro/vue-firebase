<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12" sm ="6" offset-sm="3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent="onSignin">
                <v-text-field
                  id="email"
                  v-model="email"
                  name="email"
                  label="E-Mail"
                  type="email"
                  required
                />

                <v-text-field
                  id="password"
                  v-model="password"
                  name="password"
                  label="Password"
                  type="password"
                  required
                />

                <div class="d-flex justify-center">
                  <v-btn
                    type="submit"
                    color="primary"
                  >
                    Sign in
                  </v-btn>
                </div>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    error () {
      return this.$store.getters.error
    },

    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
