import { createRouter, createWebHistory } from 'vue-router'
// >>>>>> 수동으로 import
import HomeView from '../views/HomeView.vue'

// 동적으로 import 하기위한 defineAsyncComponent
import { defineAsyncComponent } from 'vue'

// 원하는 파일들을 router로 지정하기 위한 배열
const routes = []

// 디렉토리 내의 Vue 파일을 동적으로 가져와 라우터에 등록
const files = import.meta.glob('../views/*.vue')

// for문 돌면서 View.vue 에 해당하는 파일 조건으로 name 을 가공한다.
for (const path in files) {
  // 끝자리가 'View.vue' 인 파일 조건
  if (path.endsWith('View.vue')) {
    const name = path
      .split('/')
      .pop()
      .replace(/View\.vue$/, '')
      .toLowerCase()
    const component = defineAsyncComponent(() => files[path]())
    routes.push({
      path: `/${name}`,
      name: name,
      component
    })
  }
}
routes.push({
  path: `/`,
  name: 'main',
  component: HomeView
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // >>>>>> 수동으로 명시적으로 배열 라우터 선언
  // routes: [
  //   {
  //     path: '/home',
  //     name: 'home',
  //     component: HomeView
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/AboutView.vue')
  //   }
  // ]

  // push 된 배열을 리턴
  routes
})

export default router

/**
 * TODO
 *
 * 큰 문제는 아니지만, 동적으로 배열로 만들어서 라우터 할 경우
 * [Vue Router warn]: Component "default" in record with path "/about" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".
 * 라는 경고가 뜨게 됨.
 *
 * vite 빌드에서는  defineAsyncComponent 를 활용하여 동적으로 import 하는것을 선호하지 않는것 같음.
 * 명시적으로 import 해주어야 경고가 안뜬다.
 *
 * 이 문제는, 동적으로 import 해주어야 할 파일이 엄청나게 많지 않는 이상 수동으로 import 해주는게 좋을듯한?
 *
 *  */
