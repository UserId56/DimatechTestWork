<template>
    <div class="modal">
        <div class="modal-block">
            <div class="modal-block__title">Добавление сектора</div>
            <div class="edit">
                <span>Название</span>
                <input type="text" name="title" id="title" v-model="createdSector.labels">
            </div>
            <div class="edit">
                <span>Значение</span>
                <input type="number" min="0" name="title" id="title" v-model="createdSector.data">
            </div>
            <div class="edit edit-color">
                <span>Цвет</span>
                <div class="input-color" ref="colorEdit"></div>
            </div>
            <div class="add-btn" @click="editSector">Добавить сектор</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createPicker, from } from 'a-color-picker'
const emit = defineEmits(['created', 'edit'])

interface sectorType {
    labels: string,
    data: number,
    color: string,
    index: number | undefined

}

const props = defineProps<{
    sector: {
        type: sectorType,
        default: { labels: '', data: 0, color: '#0ed30e' }
    },
    create: {
        type: boolean,
        default: true
    }
}>()

const createdSector = ref({
    labels: props.sector.labels,
    data: props.sector.data,
    color: props.sector.color,
    index: props.sector.index
})

const colorEdit = ref(null);

const editSector = (type) => {
    emit((props.create) ? 'created' : 'edit', createdSector.value)
}

onMounted(() => {
    // console.log(AColorPicker)
    // let sukaEbanay = new createPicker(colorEdit.value, {
    //     color: '#ffff',
    //     showHSL: false
    // })
    from('div.input-color', {
        color: props.sector.color,
        showHSL: false,
        showAlpha: true,
        slBarSize: [348, 150]
    })
        .on('change', (picker, color) => {
            createdSector.value.color = color;
        });;
})

</script>

<style lang="scss">
.modal {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #51515161;

    &-block {

        position: absolute;
        width: 390px;
        left: calc(50% - 390px/2);
        top: calc(50% - 664px/2 - 58px);
        padding: 20px;
        background: #FFFFFF;
        border-radius: 15px;

        &__title {
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #252F4A;
            text-align: left;
        }
    }
}

.edit {
    padding: 10px 20px;
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #DBDFE9;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-top: 20px;

    &>span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #99A1B7;
    }

    &>input {
        width: 100%;
        background: #FFFFFF;
        border: none;
        outline: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #252F4A;
        margin-top: 10px;
        box-sizing: border-box;
        resize: none;
        overflow: auto;
        margin: 0;

    }

    &>input::-webkit-outer-spin-button,
    &>input::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
        margin: 0;
    }

    & .input-color {
        width: 100%;
    }
}
</style>