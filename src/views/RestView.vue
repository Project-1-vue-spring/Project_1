<template>
  <!-- Create 용 form -->
  <b-form
    v-if="restValue.type === 'C'"
    @submit="onSubmit"
    @reset="onReset"
    class="position-absolute top-50 start-50 translate-middle"
  >
    <h1>RestClient_테스트 입니다.</h1>
    <br />
    <b-form-group
      id="input-group-1"
      label="TEST URI :"
      label-for="input-1"
      description="테스트 할 URI 값을 입력하세요"
    >
      <b-form-input
        id="input-1"
        v-model="restValue.uri"
        type="text"
        placeholder="https://xxxxxxxxx....!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="VALUE :"
      label-for="input-2"
      description="테스트 할 값을 입력하세요."
    >
      <b-form-input
        id="input-1"
        v-model="restValue.value"
        type="text"
        placeholder="test value here....!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="TYPE :"
      label-for="input-2"
      description="테스트 할 방식을 입력하세요."
    >
      <b-form-radio-group
        v-model="restValue.type"
        :options="restValue.options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        required
      ></b-form-radio-group>
    </b-form-group>

    <b-button class="m-1" type="submit" variant="primary">테스트</b-button>
    <b-button class="m-1" @click="onClickSetting" variant="success">테스트 SET</b-button>
    <b-button class="m-1" type="reset" variant="danger">초기화</b-button>
    <br />
    <br />
    <b-form-group
      id="input-group-3"
      label="테스트 결과 :"
      label-for="input-3"
      description="테스트 결과값이 표시 됩니다."
    >
      <b-container fluid>
        <b-form-textarea
          id="textarea-auto-height"
          v-model="restValue.result"
          placeholder="textarea"
          rows="5"
          max-rows="10"
          readonly
        ></b-form-textarea>
      </b-container>
    </b-form-group>
  </b-form>
  <!-- ================================================================================= -->
  <!-- build 용 form -->
  <b-form
    v-if="restValue.type === 'B'"
    @submit="onSubmit"
    @reset="onReset"
    class="position-absolute top-50 start-50 translate-middle"
  >
    <h1>RestClient_테스트 입니다.</h1>
    <br />
    <b-form-group
      id="input-group-1"
      label="BASE URL :"
      label-for="input-1"
      description="테스트 할 BASE URL 값을 입력하세요"
    >
      <b-form-input
        id="input-1"
        v-model="restValue.baseUrl"
        type="text"
        placeholder="https://xxxxxxxxx....!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-1"
      label="TEST URI :"
      label-for="input-1"
      description="테스트 할 URI 값을 입력하세요"
    >
      <b-form-input
        id="input-1"
        v-model="restValue.uri"
        type="text"
        placeholder="/xxxx/xxxxx....!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-1"
      label="HEADER :"
      label-for="input-1"
      description="테스트 할 header, headerValue 값을 입력하세요"
    >
      <b-form-input
        id="input-1"
        v-model="restValue.header"
        type="text"
        placeholder="header name here ...!"
        required
      ></b-form-input>
      <b-form-input
        class="mt-2"
        id="input-1"
        v-model="restValue.headerValue"
        type="text"
        placeholder="header value here...!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="VALUE :"
      label-for="input-2"
      description="테스트 할 값을 입력하세요."
    >
      <b-form-input
        id="input-1"
        v-model="restValue.value"
        type="text"
        placeholder="test value here....!"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="TYPE :"
      label-for="input-2"
      description="테스트 할 방식을 입력하세요."
    >
      <b-form-radio-group
        v-model="restValue.type"
        :options="restValue.options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
        required
      ></b-form-radio-group>
    </b-form-group>

    <b-button class="m-1" type="submit" variant="primary">테스트</b-button>
    <b-button class="m-1" @click="onClickSetting" variant="success">테스트 SET</b-button>
    <b-button class="m-1" type="reset" variant="danger">초기화</b-button>
    <br />
    <br />
    <b-form-group
      id="input-group-3"
      label="테스트 결과 :"
      label-for="input-3"
      description="테스트 결과값이 표시 됩니다."
    >
      <b-container fluid>
        <b-form-textarea
          id="textarea-auto-height"
          v-model="restValue.result"
          placeholder="textarea"
          rows="5"
          max-rows="10"
          readonly
        ></b-form-textarea>
      </b-container>
    </b-form-group>
  </b-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { stringifyQuery } from 'vue-router'
import axios from 'axios'

const restValue = ref({
  result: '',
  baseUrl: '',
  header: '',
  headerValue: '',
  uri: '',
  value: '',
  type: 'C',
  options: [
    { item: 'C', name: 'Create ( )' },
    { item: 'B', name: 'Build ( )' },
    { item: { d: 1 }, name: 'Option D', notEnabled: true }
  ]
})

async function onSubmit() {
  if (restValue.value.type === 'C') {
    await axios
      .get('/api/rest-client/create', {
        params: {
          uri: restValue.value.uri,
          value: restValue.value.value,
          type: restValue.value.type
        }
      })
      .then((res) => {
        alert('RestClient 전송을 성공 했습니다.')
        restValue.value.result = JSON.stringify(res.data)
      })
      .catch((error) => {
        alert('RestClient 전송을 실패 했습니다.')
      })
  } else {
    await axios
      .get('/api/rest-client/builder', {
        params: {
          baseUrl: restValue.value.baseUrl,
          header: restValue.value.header,
          headerValue: restValue.value.headerValue,
          uri: restValue.value.uri,
          value: restValue.value.value,
          type: restValue.value.type
        }
      })
      .then((res) => {
        alert('RestClient 전송을 성공 했습니다.')
        restValue.value.result = JSON.stringify(res.data)
      })
      .catch((error) => {
        alert('RestClient 전송을 실패 했습니다.')
      })
  }
}

async function onReset(event) {
  event.preventDefault()
  restValue.value.baseUrl = ''
  restValue.value.header = ''
  restValue.value.headerValue = ''
  restValue.value.uri = ''
  restValue.value.value = ''
  restValue.value.result = ''
}

async function onClickSetting() {
  if (restValue.value.type === 'C') {
    restValue.value.uri = 'https://project-1.shop/api/test?dno={id}'
    restValue.value.value = '10'
  } else {
    restValue.value.baseUrl = 'https://project-1.shop'
    restValue.value.header = 'Accept'
    restValue.value.headerValue = 'application/json'
    restValue.value.uri = '/api/test?dno={id}'
    restValue.value.value = '20'
  }
}
</script>

<style></style>
