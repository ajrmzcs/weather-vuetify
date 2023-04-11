<template>
  <v-radio-group
    inline
    v-model="selectedValue"
    @update:modelValue="onRadioGroupUpdate"
  >
    <v-radio
      label="°F"
      color="orange-darken-1"
      :value="true"
    ></v-radio>
    <v-radio
      label="°C"
      color="orange-darken-1"
      :value="false"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  modelValue: Boolean
});
const emits = defineEmits(['unit-value']);
const selectedValue = ref(false);

onMounted(() => {
  selectedValue.value = props.modelValue;
});

const onRadioGroupUpdate = (value) => {
  emits('unit-value', value);
}

</script>

<style scoped>

</style>
