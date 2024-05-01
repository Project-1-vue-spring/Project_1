<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ result2 }}</h1>
    <input v-model="input" @keypress.enter="onClick()" />
    <button @click="onClick()">DNO_TEST</button>
    <HelloWorld msg="Welcome!" />
</template>

<script>
/**
 *  script 부분이 vue2 와 vue3차이
 *  vue3 에서 <script setup> 을 사용하면
 *  아래 export default 안의 선언부(data(),methods 같은 별도 선언부 필요x)
 *  this사용안해도 됨
 *  App.vue 파일과 비교 참고.
 */
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
    data() {
        return {
            result2: "",
            input: "",
        };
    },
    methods: {
        onClick() {
            axios
                .get("/api/test", {
                    params: {
                        dno: this.input,
                    },
                })
                .then((res) => {
                    console.log(res);
                    console.log(this.result2);
                    this.result2 = res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
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
