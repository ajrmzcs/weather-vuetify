<template>
  <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-icon="mdi-sun-thermometer-outline"
            title="Weather monitor"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="store.ready" density="compact" nav>
          <v-list-item
            v-for="c in store.cities"
            :title="`${c.city}, ${c.state}`"
            :value="c.city_id"
            :key="c.city_id"
            class="city-icon"
            @click="getCity(c.city_id)"
          >
            <template v-slot:prepend>
              <v-icon color="orange-darken-1">mdi-weather-partly-cloudy</v-icon>
            </template>
          </v-list-item>
        </v-list>

        <v-sheet v-else class="d-flex justify-center mt-4" style="height: 100vh">
          <v-progress-circular
            indeterminate
            color="orange-darken-1"
          ></v-progress-circular>
        </v-sheet>


      </v-navigation-drawer>
      <default-view />
    </v-layout>
</template>

<script setup>
import {onMounted} from "vue";
import { store } from '@/components/store.js'
import router from '@/router/index.js';
import axios from "@/plugins/axios";
import DefaultView from './View.vue'


onMounted(() => {
  axios.get('/api/cities')
    .then(response => {
      store.cities = response.data.data
      store.ready = true;
    });
});

const getCity = (id) => {
  router.push({ name: 'CityDetails', params: { id } });
}

</script>

