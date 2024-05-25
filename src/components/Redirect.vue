<!-- =============================================================

store.js 관련 테스트중.... 미완성...

'vuex' 관련 공부 필요..

================================================================-->
<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import router from '@/router'
// import store from '@/stores/store.js'

onMounted(() => {
  const token = this.$route.query.token
  console.log('token', token)
  if (token) {
    store.commit('setToken', token)
    sessionStorage.setItem('accessToken', token)
    window.alert('로그인하였습니다')
    router.push({ path: '/' })
  } else {
    window.alert('로그인에 실패하였습니다.')
    router.push({ path: '/login' })
  }
})
</script>

<style scoped></style>
