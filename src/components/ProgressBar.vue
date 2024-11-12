<template>
    <div class="progress-bar" :style="`--progress: ${value};--color-stroke:${colorStroke};`">
        <svg :class="{
            'dashboard': props.dashboard,
        }">
            <circle cx="70" cy="70" r="70">
            </circle>
            <circle cx="70" cy="70" r="70">
            </circle>
        </svg>
        <div class="precent" v-if="props.status === 'in progress'">{{ precent }}</div>
        <div class="success" v-if="props.status === 'success'"></div>
        <div class="warning" v-if="props.status === 'warning'">!</div>
        <div class="error" v-if="props.status === 'error'"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
    value: {
        type: Number,
        required: true,
        default: 0
    },
    dashboard: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'in progress'
    }
})

const colorStroke = computed(() => {
    switch (props.status) {
        case 'in progress':
            if (props.value < 25) {
                return '#ff4949'
            } else if (props.value < 50) {
                return '#e7a23d'
            } else if (props.value < 75) {
                return '#20a0ff'
            } else if (props.value >= 75) {
                return '#12ce66'
            }
            break;
        case 'success':
            return '#12ce66'
        case 'warning':
            return '#e7a23d'
        case 'error':
            return '#ff4949'
        default:
            break;
    }
})

const value = computed(() => {
    if (props.dashboard) {
        console.log(330 - (330 * props.value + 1) / 80)
        return props.value
    } else return props.value
})

const precent = computed(() => {
    return (props.status === 'in progress') ? props.value + ' % ' : 0
})

</script>

<style lang="scss" scoped>
body {
    margin: 0;
    padding: 0;
}

.progress-bar {
    position: relative;

    & svg {
        width: 150px;
        height: 150px;
        transform: rotate(-90deg);
        z-index: 2;
    }

    & svg.dashboard {
        width: 150px;
        height: 150px;
        transform: rotate(-225deg);
        z-index: 2;
    }
}

svg circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #191919;
    stroke-width: 10;
    stroke-linecap: round;
    transform: translate(5px, 5px)
}

svg circle:last-child {
    stroke-dasharray: 440;
    stroke-dashoffset: calc(440 - (440 * var(--progress)) / 100);
    transition: stroke-dashoffset 0.5s ease;
    stroke: var(--color-stroke);
}

svg.dashboard circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #191919;
    stroke-width: 10;
    stroke-linecap: round;
    transform: translate(5px, 5px);
    stroke-dasharray: 440;
    stroke-dashoffset: 110;
}

svg.dashboard circle:last-child {
    stroke-dashoffset: calc((440 - (330 * var(--progress)) / 100));
    transition: stroke-dashoffset 0.5s ease;
    stroke: var(--color-stroke);
}

.precent,
.success,
.warning,
.error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    font-weight: bold;
}

.warning {
    border-radius: 50%;
    background-color: var(--color-stroke);
    width: 1.2em;
    height: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.success {
    width: 30px;
    height: 30px;

    &::after {
        content: '';
        position: absolute;
        width: 5px;
        height: 25px;
        background-color: var(--color-stroke);
        top: -4px;
        left: 9px;
        transform: rotate(45deg) scaleY(0);
        /* Начальное состояние линии */
        transform-origin: bottom right;
        animation: draw-second 0.3s forwards ease-out;
        animation-delay: 0.3s;
    }

    &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 18.2px;
        background-color: var(--color-stroke);
        top: 5px;
        left: 12px;
        transform: rotate(-45deg) scaleY(0);
        transform-origin: bottom left;
        animation: draw-first 0.3s forwards ease-out;
    }
}

@keyframes draw-first {
    to {
        transform: rotate(-45deg) scaleY(1);
    }
}

@keyframes draw-second {
    to {
        transform: rotate(45deg) scaleY(1);
    }
}

.error {
    width: 20px;
    height: 20px;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        background-color: var(--color-stroke);
        top: calc(50% - 4px);
        left: 0;
        transform: rotate(45deg);
        transform-origin: center;
    }

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        background-color: var(--color-stroke);
        top: calc(50% - 4px);
        right: 0;
        transform: rotate(-45deg);
        transform-origin: center;
    }
}
</style>