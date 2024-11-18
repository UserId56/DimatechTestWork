<template>
    <div class="pie-page">
        <div class="page-title">Круговая диаграмма</div>
        <div class="pie-page__content">
            <div class="pie-page__interface">
                <div class="inteface-item" v-for="elemet, index in DataList" :key="index" :id="index">
                    <div class="data-elements">
                        <div class="data-elements__title">{{ elemet.labels }}</div>
                        <div class="data-elements__value">{{ elemet.data }} %
                        </div>
                        <div class="data-elements__color" :style="`background-color:${elemet.color};`"></div>
                    </div>
                    <div class="button-elements">
                        <div class="button-elements__edit" @click="editSector(index)"></div>
                        <div class="button-elements__delete" @click="deletedSector(index)"></div>
                    </div>
                </div>
                <div class="add-btn" @click="addNewSector">Добавить сектор</div>
            </div>
            <div class="pie">
                <canvas id="canvas" width="500" height="500" ref="canvas"></canvas>
            </div>
        </div>
        <ModalComponent v-if="showModal" :sector="sector" @created="createdSector" @edit="editedSector"
            :create="typeModal" />
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import ModalComponent from '../components/ModalComponent.vue'
import Chart, { Legend, plugins } from 'chart.js/auto';

const canvas = ref(null)

let myChart = reactive(null)

const showModal = ref(false)

const DataList = ref([{
    labels: 'Сектор-1',
    data: 25,
    color: 'rgb(255, 99, 132)'
},
{
    labels: 'Сектор-2',
    data: 50,
    color: 'rgb(54, 162, 235)'
}, {
    labels: 'Сектор-3',
    data: 25,
    color: 'rgb(255, 205, 86)'
}])

const GetValue = (keyName) => {
    let tempData = []
    DataList.value.forEach((item) => {
        tempData.push(item[keyName])
    })
    return tempData
}

const sector = ref({
    labels: '',
    data: '',
    color: '',
    index: null
})
const typeModal = ref(false)

const addNewSector = () => {
    sector.value = {
        labels: '',
        data: '',
        color: '',
        index: null
    }
    typeModal.value = true
    showModal.value = true
}

const editSector = (index) => {
    typeModal.value = false
    sector.value = DataList.value[index]
    sector.value.index = index
    showModal.value = true
}

const editedSector = (editSector) => {
    DataList.value[editSector.index].labels = editSector.labels
    DataList.value[editSector.index].data = editSector.data
    DataList.value[editSector.index].color = editSector.color
    myChart.data.labels[editSector.index] = editSector.labels
    myChart.data.datasets[0].backgroundColor[editSector.index] = editSector.color
    myChart.data.datasets[0].data[editSector.index] = editSector.data
    showModal.value = false
    myChart.update();
}

const deletedSector = (index) => {
    DataList.value.splice(index, 1)
    myChart.data.labels.splice(index, 1)
    myChart.data.datasets[0].data.splice(index, 1)
    myChart.data.datasets[0].backgroundColor.splice(index, 1)
    myChart.update();
}

const createdSector = (newSector) => {
    const { labels, data, color, ...rest } = newSector
    DataList.value.push({ labels, data, color })
    myChart.data.labels.push(newSector.labels)
    myChart.data.datasets[0].data.push(newSector.data)
    myChart.data.datasets[0].backgroundColor.push(newSector.color)
    showModal.value = false
    myChart.update();
}
onMounted(() => {
    canvas.value.width = 500;
    canvas.value.height = 500;
    const ctx = canvas.value.getContext('2d');
    const data = {
        labels: GetValue('labels'),
        datasets: [{
            label: 'Круговая диаграмма',
            data: GetValue('data'),
            backgroundColor: GetValue('color')
        }]

    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        pointStyle: 'circle',
                        usePointStyle: true,
                        boxWidth: 14,
                        boxHeight: 14,
                        pointStyleWidth: 0,
                        padding: 20


                    }
                }
            }
        }
    };

    myChart = new Chart(ctx, config);
})




</script>

<style lang="scss">
.page-title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    color: #252F4A;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #DBDFE9;
    padding-bottom: 30px;
    padding-left: 10px;
}

.pie-page {
    width: 1170px;
    margin: 0 auto;

    &__content {
        display: flex;
        margin-top: 40px;
        justify-content: space-between;
    }

    &__interface {
        width: 100%;
        margin-right: 90px;

    }
}

.pie {
    width: 500px;
    height: 500px;
}

.inteface-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    width: 100%;
    background: rgba(219, 223, 233, 0.2);
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 5px;
}

.data-elements {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 253px;

    &__title {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #252F4A;
        flex: 2;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-wrap: nowrap;
        overflow: hidden;
    }

    &__value {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #252F4A;
        flex: 1;
    }

    &__color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-left: 25px;
    }

    &>*:not(:last-child) {
        border-right: 2px solid #DBDFE9;
    }
}

.button-elements {
    display: flex;
    width: 70px;
    justify-content: space-between;

    &__edit {
        width: 24px;
        height: 24px;
        background: url('../assets/images/edit.png') no-repeat center center;
        cursor: pointer;
    }

    &__delete {
        width: 24px;
        height: 24px;
        background: url('../assets/images/delete.png') no-repeat center center;
        cursor: pointer;
        margin-left: 10px;
    }
}

.add-btn {
    width: 100%;
    margin-top: 30px;
    background: #1B84FF;
    border-radius: 10px;
    padding: 18px 0 18px 0;
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
}
</style>
