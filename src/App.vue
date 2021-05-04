<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
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

      <v-toolbar-title>
        <router-link to="/" custom v-slot="{ navigate }">
          <span @click="navigate" @keypress.enter="navigate" role="link">
              DevMeetup
          </span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          plain
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>
            {{item.icon}}
          </v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    menuItems: [
      { icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups' },
      { icon: 'mdi-map-marker', title: 'Organize Meetups', link: '/meetup/new' },
      { icon: 'mdi-account-circle', title: 'Profile', link: '/profile' },
      { icon: 'mdi-account', title: 'Sign up', link: '/signup' },
      { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
    ]
  })
}
</script>
