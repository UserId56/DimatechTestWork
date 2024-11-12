<script setup>
import ProgressBar from './components/ProgressBar.vue'
import { ref } from 'vue'

const testValue = ref(12)
const testValueDashBoard = ref(0)
const statusTest = ref('in progress')
const statusDashBoard = ref('in progress')
const statusList = ['in progress', 'success', 'warning', 'error']
let indexStatus = 0

function editStatus() {
  if (indexStatus != statusList.length - 1) {
    indexStatus++
    statusTest.value = statusList[indexStatus]
  } else {
    indexStatus = 0
    statusTest.value = statusList[indexStatus]
  }
  console.log(statusTest.value)
}

function getValue(newValue) {
  let tempValue = parseInt(newValue.target.value)
  if (tempValue != 100) {
    statusTest.value = 'in progress'
  } else {
    statusTest.value = 'success'
  }
  testValue.value = tempValue
}

function getValueDashboard(newValue) {
  let tempValue = parseInt(newValue.target.value)
  testValueDashBoard.value = tempValue
}

</script>

<template>
  <div class="content">
    <div class="content__item">
      <button @click="editStatus" class="m-b-12">Сменить статус</button>
      <input type="range" name="test-bar" id="testbar" @input="getValue" :value="testValue" class="m-b-12">
      <ProgressBar :value="testValue" :status="statusTest"></ProgressBar>
    </div>
    <div class="content__item">
      <input type="range" name="test-bar" id="testbar" @input="getValueDashboard" :value="testValueDashBoard"
        class="m-b-12">
      <ProgressBar :value="testValueDashBoard" :status="statusDashBoard" dashboard></ProgressBar>
    </div>
  </div>
</template>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;

  &__item {
    display: flex;
    flex-direction: column;
  }
}

.m-b-12 {
  margin-bottom: 12px;
}
</style>
