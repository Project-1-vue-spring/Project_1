<template>
  <b-form
    @submit="onSubmit"
    @reset="onReset"
    class="position-absolute top-50 start-50 translate-middle"
  >
    <h1>Mail_테스트 입니다.</h1>
    <br />
    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-1"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="input-1"
        v-model="mailInfo.email"
        type="email"
        placeholder="name@example.com"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-1-1"
      label="Email subject:"
      label-for="input-1-1"
      description="enter subject here."
    >
      <b-form-input
        id="input-1-1"
        v-model="mailInfo.subject"
        type="text"
        placeholder="Enter Subject"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Context:" label-for="input-2">
      <b-form-textarea
        id="textarea"
        v-model="mailInfo.context"
        placeholder="Enter Context..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>

    <b-form-radio-group
      v-model="select.selected"
      :options="select.options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-radio-group>

    <!-- 전송시간 딜레이 동안 Spinner 버튼이 되도록 컨트롤. -->
    <b-button v-if="send" variant="primary" disabled>
      <b-spinner small></b-spinner>
      <span class="sr-only"> Sending Mail...</span>
    </b-button>
    <b-button v-if="!send" class="m-1" type="submit" variant="primary"> Submit </b-button>
    <b-button class="m-1" type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 부트스트랩vue3용 toast import
import { useToast } from 'bootstrap-vue-3'
const toast = useToast()

const select = ref({
  selected: 'mail',
  options: [
    { item: 'mail', name: 'Mail' },
    { item: 'code', name: 'Code' },
    { item: 'password', name: 'Password' },
    { item: { d: 1 }, name: 'Option D', notEnabled: true }
  ]
})

const mailInfo = ref({
  email: '',
  subject: '',
  context: '',
  type: ''
})

// 전송시간 딜레이 동안 Spinner 버튼이 되도록 컨트롤.
const send = ref(false)

/**
 * @description 메일전송
 * @param evet
 */
async function onSubmit(event) {
  event.preventDefault()
  //   alert(JSON.stringify(mailInfo.value))

  send.value = true
  mailInfo.value.type = select.value.selected

  await axios
    .post('/api/mail/email', mailInfo.value)
    .then((res) => {
      // 버튼상태 원복
      send.value = false
      // 전송완료 toast
      toast.show(
        {
          title: '메일 전송을 성공 했습니다.',
          body: '전송성공...!'
        },
        { variant: 'primary', pos: 'top-right', autoHide: true, delay: 5000 }
      )
      onReset(event)
    })
    .catch((error) => {
      // 실패 및 오류 toast
      toast.danger(
        {
          title: '메일 전송을 실패 했습니다.',
          body: JASON.stringify(error)
        },
        { pos: 'top-right', autoHide: true, delay: 5000 }
      )
    })
}

/**
 * @description 초기화
 * @param evet
 */
async function onReset(event) {
  event.preventDefault()

  // 파라메터 초기화
  mailInfo.value.email = ''
  mailInfo.value.subject = ''
  mailInfo.value.context = ''
}
</script>

<style scoped></style>
