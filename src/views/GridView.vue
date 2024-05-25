<template>
  <div>
    <!-- The AG Grid component -->
    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="height: 600px; width: 900px; margin: auto"
      class="ag-theme-quartz-dark position-absolute top-50 start-50 translate-middle"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component

// Row Data: The data to be displayed.
const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false }
])

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  { field: 'make', editable: true },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' }
])
</script>

<style scoped></style>
