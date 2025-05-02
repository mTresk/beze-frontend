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
</script>

<template>
    <VFormBlock :error="error">
        <VFormField>
            <VFormLabel for="address">
                Выберите пункт выдачи*
            </VFormLabel>
            wip: CDEK
        </VFormField>
    </VFormBlock>
</template>
