<script setup lang="ts">
import type { LocationOptions } from 'vue-dadata-3'

const props = defineProps<{
    address: string
    error?: string[]
}>()

const emit = defineEmits<{
    (e: 'update:address', value: string): void
}>()

const addressProxy = ref(props.address)

const locationOptions: LocationOptions = {
    locations: [{ city: 'Тюмень' }],
}

watch(() => props.address, (val) => {
    addressProxy.value = val
})

watch(addressProxy, (val) => {
    if (props.address !== val)
        emit('update:address', val)
})
</script>

<template>
    <VFormBlock :error="error">
        <VFormField>
            <VFormLabel for="address">
                Адрес доставки*
            </VFormLabel>
            <VFormDaData
                v-model="addressProxy"
                placeholder="Введите адрес в Тюмени"
                input-id="address"
                :location-options="locationOptions"
            />
        </VFormField>
    </VFormBlock>
</template>
