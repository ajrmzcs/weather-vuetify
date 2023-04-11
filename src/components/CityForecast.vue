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
        class="my-1"
      >
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-h4 text--primary">
                  {{ city.city }}, {{ city.state }}
                </p>
                <p class="text-h4 text--primary">
                  {{ store.fahrenheit ? city.temp_f : city.temp_c }}°
                </p>
                <p class="text-h5 text--primary">
                  {{ city.condition_text }}
                </p>
              </div>
              <v-avatar size="100">
                <v-img
                  :src="city.condition_icon"
                  class="bg-grey-lighten-2 rounded-circle d-inline-block ml-2"
                  aspect-ratio="1"
                />
              </v-avatar>
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="text-h5 text--primary mb-2">
              Forecast
            </div>
            <v-row>
              <v-col
                v-for="f in city.forecast" :key="f.date"
                cols="12"
                sm="3"
              >
                <v-card>
                  <v-card-text>
                    <div class="d-flex flex-column align-center">
                      <v-avatar size="50">
                        <v-img
                          :src="f.condition_icon"
                          class="bg-grey-lighten-2 rounded-circle d-inline-block ml-2"
                          aspect-ratio="1"
                        />
                      </v-avatar>
                      <div class="text-subtitle-1 text--primary">
                        {{ dayjs(f.date).format('MM/DD') }} - {{ f.condition_text }}
                      </div>
                      <div class="text-subtitle-1 text--primary">
                        Min: {{ store.fahrenheit ? f.mintemp_f : f.mintemp_c }}° - Max: {{ store.fahrenheit ? f.maxtemp_f : f.maxtemp_c }}°
                      </div>
                      <div class="text-xxl-subtitle-2 text--primary">
                        Sunrise: {{ f.sunrise}}
                      </div>
                      <div class="text-xxl-subtitle-2 text--primary">
                        Sunset: {{ f.sunset}}
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="back">Back to cities</v-btn>
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
import { ref, onMounted, watch } from 'vue';
import {useRoute} from 'vue-router';
import axios from '@/plugins/axios.js'
import router from '@/router'
import dayjs from "dayjs";
import UnitSwitch from "@/components/UnitSwitch.vue";
import {store} from "@/components/store";

const city = ref({});
const route = useRoute();

const back = () => {
  router.push({name: 'Home'});
}

watch(
  () => route.params.id,
  (newId) => {
    store.ready = false;
    getForecast(newId);
  }
)

onMounted(() => {
  store.ready = false;
  getForecast(route.params.id);
});

const handleUnit = (value) => {
  store.fahrenheit = value;
}

const getForecast = (id) => {
  axios.get(`/api/cities/${id}`)
    .then(response => {
      city.value = response.data.data;
      store.ready = true;
    });
}

</script>

