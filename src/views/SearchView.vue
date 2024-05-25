<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <h1>{{ test.result2 }}</h1>
    <p>DNO를 입력하세요.</p>
    <input v-model="test.input" @keypress.enter="onClick()" />
    <button @click="onClick()">DNO_TEST</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const test = ref({
  result2: '결과값 위치입니다.',
  input: ''
})

async function onClick() {
  await axios
    .get('/api/test', {
      params: {
        dno: test.value.input
      }
    })
    .then((res) => {
      console.log(res)
      console.log(test.value.result2)
      test.value.result2 = res.data
    })
    .catch((error) => {
      console.log(error)
      alert('통신오류입니다.')
    })
}
</script>

<style scoped></style>
