// =============================================================
//  pinia 관련해서도 공부가 필요해보임...
//  추후, 공부 후에 삭제 예정.
// =============================================================
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
