<script setup lang="ts">
import type { CdekPoint, CdekTariff, CDEKWidgetOptions } from '@/types/api'

declare global {
    interface Window {
        CDEKWidget: new (options: CDEKWidgetOptions) => any
    }
}

const props = defineProps<{
    address: string
    error?: string[]
}>()

const emit = defineEmits<{
    (e: 'update:address', value: string): void
    (e: 'deliveryCost', value: number): void
}>()

const addressProxy = ref(props.address)

const widgetContainer = ref<HTMLElement | null>(null)

const widget = ref()

const deliveryPoint = ref<CdekPoint | null>(null)

const deliveryCost = ref<number>(0)

watch(() => props.address, (val) => {
    addressProxy.value = val
})

watch(addressProxy, (val) => {
    if (props.address !== val)
        emit('update:address', val)
})

function loadScript() {
    return new Promise((resolve, reject) => {
        if (window.CDEKWidget)
            return resolve(true)

        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3'
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => reject(new Error('Failed to load CDEK widget'))
        document.body.appendChild(script)
    })
}

function formatDeliveryAddress(type: string, point: CdekPoint): string {
    if (!point)
        return ''
    if (type === 'office')
        return `${point.city}, ${point.address} (${point.code})`
    else
        return `${point.city}, ${point.name}`
}

async function initWidget() {
    try {
        await loadScript()
        if (!widgetContainer.value || !window.CDEKWidget) {
            throw new Error('Widget initialization failed')
        }

        const servicePath = '/api/cdek'

        widget.value = new window.CDEKWidget({
            apiKey: useRuntimeConfig().public.yandexMapsApiKey,
            root: widgetContainer.value,
            servicePath,
            defaultLocation: 'Москва',
            from: 'Тюмень',
            currency: 'RUB',
            goods: [
                {
                    width: 20,
                    height: 10,
                    length: 20,
                    weight: 5,
                },
            ],
            tariffs: {
                office: [234, 136],
                door: [233, 137],
            },

            popup: true,
            lang: 'rus',
            onChoose(type: string, tariff: CdekTariff, point: CdekPoint) {
                deliveryPoint.value = point
                deliveryCost.value = tariff.delivery_sum
                addressProxy.value = formatDeliveryAddress(type, point)

                emit('deliveryCost', tariff.delivery_sum)

                widget.value.close()
            },
        })
    }
    catch (error) {
        console.error(error)
    }
}

onMounted(initWidget)

onUnmounted(() => widget.value?.destroy())
</script>

<template>
    <VFormBlock :error="error">
        <VFormField>
            <VFormLabel for="address">
                Выберите пункт выдачи или адрес*
            </VFormLabel>
            <VFormInput id="address" v-model="addressProxy" readonly placeholder="Выберите адрес" @click="widget?.open()" />
            <div id="cdek-widget-container" ref="widgetContainer" />
        </VFormField>
    </VFormBlock>
</template>
