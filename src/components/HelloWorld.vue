<template>
  <div>
    <h1>{{ test.result2 }}</h1>
    <p>DNO를 입력하세요.</p>
    <input v-model="test.input" @keypress.enter="onClick()" />
    <button @click="onClick()">DNO_TEST</button>
  </div>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  msg: {
    type: String,
    required: true
  }
})

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

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
