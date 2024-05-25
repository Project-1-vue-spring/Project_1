import { createRouter, createWebHistory } from 'vue-router'
import Redirect from '../components/Redirect.vue'
// 동적으로 import 하기위한 defineAsyncComponent
// import { defineAsyncComponent } from 'vue'

// 원하는 파일들을 router로 지정하기 위한 배열
const routes = []

// 디렉토리 내의 Vue 파일을 동적으로 가져와 라우터에 등록( vite 문법 )
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
    // const component = defineAsyncComponent(() => files[path]())
    routes.push({
      path: `/${name}`,
      name: name,
      component: files[path] // [해결] : vue 에서 defineAsyncComponent 를 import 하지 않아도, 이런식으로 path를 잡으면 ()=> import ~~~ 시킬 수 있음.
    })
  }
}
routes.push({
  path: `/oauth2/redirect`,
  name: 'redirect',
  component: Redirect
})

// 최상위 루트 지정. 첫페이지 로드 main 으로 자동 리다이렉트.
routes.push({
  path: '/',
  name: 'root',
  redirect: '/main'
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
 * 2024_05_13
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
 *
 * 2024_05_14 해결...
 *
 * defineAsyncComponent() 를 사용하지 않고도, component 를 동적으로 가져 올 수 있음.
 * import.meta.glob 에서 [경로] 만 지정해주면 () => import 시켜 주는것을 확인.
 *
 *
 *  */
