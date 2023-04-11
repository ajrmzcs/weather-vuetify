<template>
  <v-container>
    <v-row v-if="store.ready" justify="end">
      <v-col
        class="v-col-auto"
      >
        <unit-switch @unit-value="handleUnit" v-model="store.fahrenheit" />
      </v-col>
    </v-row>
    <v-row v-if="store.ready">
      <v-col
        v-for="c in store.cities"
        :key="c.city_id"
        cols="12"
        sm="4"
        class="my-1"
      >
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-h4 text--primary">
                  {{ c.city }}
                </p>
                <p class="text-h4 text--primary">
                  {{ c.state }}
                </p>
                <p class="text-h4 text--primary">
                  {{ store.fahrenheit ? c.temp_f : c.temp_c }}°
                </p>
              </div>
              <v-avatar size="100">
                <v-img
                  :src="c.condition_icon"
                  class="bg-grey-lighten-2 rounded-circle d-inline-block ml-2"
                  aspect-ratio="1"
                />
              </v-avatar>
            </div>
            <div class="text-h6 text--primary">
              {{ c.condition_text }}
            </div>
            <div class="text-subtitle-1 text--primary">
              uv: {{ c.uv }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click="forecast(c.city_id)">View Forecast</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center" align="center" style="height: 100vh">
      <v-progress-circular
        indeterminate
        color="orange-darken-1"
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script setup>
import router from '@/router'
import UnitSwitch from "@/components/UnitSwitch.vue";
import { store } from './store.js'
import {onMounted} from "vue";

onMounted(() => {
  if (store.cities.length) {
    store.ready = true;
  }
})


const forecast = id => {
  router.push({name: 'CityDetails', params: { id }});
}

const handleUnit = (value) => {
  store.fahrenheit = value;
}
</script>
