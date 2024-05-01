<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ test.result2 }}</h1>
    <p>DNO를 입력하세요.</p>
    <input v-model="test.input" @keypress.enter="onClick()" />
    <button @click="onClick()">DNO_TEST</button>
    <!-- <HelloWorld msg="Welcome!" /> -->
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
// import HelloWorld from "./components/HelloWorld.vue";

const test = ref({
    result2: "결과값 위치입니다.",
    input: "",
});

async function onClick() {
    await axios
        .get("/api/test", {
            params: {
                dno: test.value.input,
            },
        })
        .then((res) => {
            console.log(res);
            console.log(test.value.result2);
            test.value.result2 = res.data;
        })
        .catch((error) => {
            console.log(error);
            alert("통신오류입니다.");
        });
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
