<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>
              mdi-account-group
            </v-icon>
          </v-list-item-action>
          <v-list-item-action-text>
            View Meetups
          </v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"
        class="d-sm-none">
      </v-app-bar-nav-icon>

      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn plain>
          <v-icon left>mdi-account-group</v-icon>
          View Meetups
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: false
  })
}
</script>
