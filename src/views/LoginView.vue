<template>
  <!-- <div class="login">
    <h1>This is an login page</h1>
  </div> -->
  <div class="position-absolute top-50 start-50 translate-middle">
    <!-- 아이디 -->
    <b-form @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
      <b-form-input v-model="info.userId" :state="validation.userId" id="feedback-user">
      </b-form-input>
      <b-form-invalid-feedback :state="validation.userId">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation.userId"> Looks Good. </b-form-valid-feedback>
    </b-form>
    <!-- 패스워드 -->
    <b-form class="mt-3" @submit.stop.prevent>
      <label for="text-password">Password</label>
      <b-form-input
        v-model="info.password"
        type="password"
        :state="validation.password"
        id="text-password"
        aria-describedby="password-help-block"
      ></b-form-input>
      <b-form-invalid-feedback :state="validation.password">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation.password"> Looks Good. </b-form-valid-feedback>
      <b-form-text id="password-help-block">
        Your password must be 8-20 characters long, contain letters and numbers, and must not
        contain spaces, special characters, or emoji.
      </b-form-text>
      <!-- 버튼 -->
      <b-form class="mt-3" align="center">
        <b-button class="m-1" @click="onJoin()" variant="primary">회원가입</b-button>
        <b-button class="m-1" @click="onLogin()" variant="success">로그인</b-button>
        <b-button class="m-1" @click="onReset()" variant="danger">Reset</b-button>
      </b-form>
    </b-form>
    <!-- 소셜로그인 -->
    <b-from>
      <div class="mt-3" align="center">
        <a
          href="http://localhost:8081/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <img class="bi me-2" width="55" height="55" src="../assets/google_icon_circle.png" />
        </a>
        <a
          href="http://localhost:8081/oauth2/authorize/naver?redirect_uri=http://localhost:3000/oauth2/redirect"
        >
          <img class="bi me-2" width="55" height="55" src="../assets/naver_icon_circle.png" />
        </a>
        <a :href="kakaoValue.URI">
          <img class="bi me-2" width="55" height="55" src="../assets/kakao_icon_circle.png" />
        </a>
      </div>
    </b-from>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import router from '@/router'

const info = ref({
  userId: '',
  password: ''
})
const validation = ref({
  userId: false,
  password: false
})

const kakaoValue = ref({
  URI: ''
})

async function onKakaoLogin() {
  await axios
    .post('/api/user/kakao/info', {})
    .then((res) => {
      console.log(res)
      kakaoValue.value.URI = res.data
      console.log(kakaoValue.value.URI)
    })
    .catch((error) => {
      console.log(error)
      alert('로그인이 올바르지 않습니다. 아이디 암호를 확인해주세요.')
    })
}

async function onLogin() {
  if (validation.value.userId && validation.value.password) {
    await axios
      .post('/api/user/login', {
        userId: info.value.userId,
        userPassword: info.value.password
      })
      .then((res) => {
        console.log(res)
        router.push({ path: '/main' })
      })
      .catch((error) => {
        console.log(error)
        alert('로그인이 올바르지 않습니다. 아이디 암호를 확인해주세요.')
      })
  } else {
    alert('아이디 암호 형식을 맞추어야 합니다.')
    return
  }
}

async function onJoin() {
  if (validation.value.userId && validation.value.password) {
    await axios
      .post('/api/user/join', {
        userId: info.value.userId,
        userPassword: info.value.password
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
        alert('통신오류입니다.')
      })
  } else {
    alert('아이디 암호 형식을 맞추어야 합니다.')
    return
  }
}

async function onReset() {
  info.value.userId = ''
  info.value.password = ''
}

onMounted(() => {
  onKakaoLogin()
})

watch(info.value, () => {
  console.log(info.value)
  // console.log(userId.value)
  // console.log(userId.value)
  if (info.value.userId.length > 4 && info.value.userId.length < 13) {
    validation.value.userId = true
  } else {
    validation.value.userId = false
  }

  if (info.value.password.length > 7 && info.value.password.length < 21) {
    validation.value.password = true
  } else {
    validation.value.password = false
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
