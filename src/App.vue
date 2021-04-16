<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-action-text>
            {{item.title}}
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
        <v-btn plain v-for="item in menuItems" :key="item.title">
          <v-icon left>
            {{item.icon}}
          </v-icon>
          {{ item.title }}
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
    drawer: false,
    menuItems: [
      { icon: 'mdi-account-group', title: 'View Meetups' },
      { icon: 'mdi-bank', title: 'Organize Meetups' },
      { icon: 'mdi-account-circle', title: 'Profile' },
      { icon: 'mdi-account', title: 'Sign up' },
      { icon: 'mdi-lock-open', title: 'Sign in' }

    ]
  })
}
</script>
