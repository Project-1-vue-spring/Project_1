<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div>
      <div class="text-center mb-3 d-flex justify-content-between">
        <b-spinner v-for="variant in variants" :variant="variant" :key="variant"></b-spinner>
      </div>

      <div class="text-center d-flex justify-content-between">
        <b-spinner
          v-for="variant in variants"
          :variant="variant"
          :key="variant"
          type="grow"
        ></b-spinner>
      </div>
    </div>
    <br />
    <h1>메인페이지 입니다.</h1>
    <br />
    <h3>올해는 이만큼 지났습니다.</h3>
    <h5>다들 힘냅시다...!</h5>
    <br />
    <b-progress :max="day.total" height="3rem">
      <b-progress-bar :value="day.diff">
        <span
          >올해는...: <strong>{{ day.diff }} / {{ day.total }} </strong></span
        >
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const variants = ref([
  'primary',
  'secondary',
  'danger',
  'warning',
  'success',
  'info',
  'light',
  'dark'
])

const day = ref({
  total: 365,
  diff: 0
})

const endDay = dayjs().endOf('year')
const today = dayjs()

day.value.diff = 365 - endDay.diff(today, 'd')

console.log(endDay)
console.log(today)
console.log(day.value.diff)
</script>

<style></style>
