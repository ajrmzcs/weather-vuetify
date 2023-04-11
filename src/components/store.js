import { reactive } from 'vue'

export const store = reactive({
  cities: [],
  ready: false,
  fahrenheit: true,
})
