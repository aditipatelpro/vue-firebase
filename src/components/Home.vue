<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" class="text-xs-center text-sm-right">
        <v-btn large color="primary" router to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col xs="12" sm="6" class="text-xs-center text-sm-left">
        <v-btn large color="primary" router to="/meetup/new">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageURL"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" class="text-xs-center">
        <p>Join awesome meetups</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    meetups: [
      { imageURL: 'https://static.rentcars.com/imagens/modules/localidade/about/739-desktop-location-description.png', id: '1', title: 'Meetup in Boston' },
      { imageURL: 'https://thumbnails.expedia.com/WAIOLrW6W9eerDtrV8bChFwICn4=/536x384/smart/filters:quality(60)/a.cdn-hotels.com/cos/heroimage/Toronto_EEX15P.jpg', id: '2', title: 'Meetup in Toronto' },
      { imageURL: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg', id: '3', title: 'Meetup in New York' },
      { imageURL: 'https://www.swissotel.com/assets/0/92/2119/2120/2159/2161/6442451653/842c3170-fbea-4dcb-a655-c82988987467.jpg', id: '4', title: 'Meetup in Chicago' }

    ]
  })
}
</script>
