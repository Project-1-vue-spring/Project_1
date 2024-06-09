<!-- =============================================================

헤더입니다. 

여기서 최상단 헤더 메뉴 구성 및 router 활용하여 페이지 이동합니다.

================================================================-->
<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="navbar navbar-expand-sm bg-dark navbar-dark"
    >
      <b-navbar-brand href="#" @click="goPage('main')">
        <img src="@/assets/vue.svg" class="logo vue img-thumbnail w-25 h-25" alt="Vue logo" />
        Project_1
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- 성우 테스트 메뉴 -->
          <b-nav-item-dropdown text="SUNGWOO" left>
            <b-dropdown-item @click="goPage('search')">검색_테스트</b-dropdown-item>
            <b-dropdown-item @click="goPage('mail')">메일_테스트</b-dropdown-item>
            <b-dropdown-item @click="goPage('rest')">RestClient_테스트</b-dropdown-item>
            <b-dropdown-item @click="goPage('grid')">그리드_테스트</b-dropdown-item>
            <b-dropdown-item @click="goPage('login')">로그인_테스트</b-dropdown-item>
            <b-dropdown-item @click="goPage('home')">아이콘 및 컴포넌트_테스트</b-dropdown-item>
            <b-dropdown-item href="#">test</b-dropdown-item>
            <b-dropdown-item href="https://www.project-1.shop/main">test</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- 흥준 테스트 메뉴 -->
          <b-nav-item-dropdown text="HEUNGJUN" left>
            <b-dropdown-item @click="goPage('')">test1</b-dropdown-item>
            <b-dropdown-item href="#">test2</b-dropdown-item>
            <b-dropdown-item href="#">test3</b-dropdown-item>
            <b-dropdown-item href="#">test4</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- 대원 테스트 메뉴 -->
          <b-nav-item-dropdown text="DAEWON" left>
            <b-dropdown-item @click="goPage('')">test1</b-dropdown-item>
            <b-dropdown-item href="#">test2</b-dropdown-item>
            <b-dropdown-item href="#">test3</b-dropdown-item>
            <b-dropdown-item href="#">test4</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="#">TEST</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <b-nav-form align="end">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script setup>
// router 등록되어있는 js import
import router from '@/router/index.js'

/**
 * @description 페이지 이동하는 함수,
 * @param name router에 등록되는 페이지명 전달.
 */
async function goPage(name) {
  console.log(name === '' ? 'main page 이동' : name + ' page 이동')
  router.push('/' + name)
}
</script>

<style scoped></style>
