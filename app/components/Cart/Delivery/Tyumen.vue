<script setup lang="ts">
const props = defineProps<{
    address: string
    error?: string[]
}>()

const emit = defineEmits<{
    (e: 'update:address', value: string): void
}>()

const addressProxy = ref(props.address)

watch(() => props.address, (val) => {
    addressProxy.value = val
})

watch(addressProxy, (val) => {
    if (props.address !== val)
        emit('update:address', val)
})

watch(addressProxy, (val) => {
    if (!val || !val.startsWith('г Тюмень')) {
        addressProxy.value = 'г Тюмень'
    }
}, { immediate: true })
</script>

<template>
    <VFormBlock :error="error">
        <VFormField>
            <VFormLabel for="address">
                Адрес доставки*
            </VFormLabel>
            <VFormDaData
                v-model="addressProxy"
                placeholder="Введите адрес"
                input-id="address"
            />
        </VFormField>
    </VFormBlock>
</template>
