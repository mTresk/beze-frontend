<script setup lang="ts">
import type { IOrder, ValidationErrors } from '@/types/api'

defineProps<{
    errors: ValidationErrors
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: typeof form | null): void
}>()

const options = [
    { id: 1, name: 'Телефон' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Telegram' },
    { id: 4, name: 'WhatsApp' },
]

const form = reactive<Partial<IOrder>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    communication: undefined,
})

watch(form, (newForm) => {
    emit('update:modelValue', newForm)
}, { deep: true })
</script>

<template>
    <VForm>
        <VFormBlock :error="errors.name">
            <VFormField>
                <VFormLabel for="name">
                    Ваше имя (полностью) *
                </VFormLabel>
                <VFormInput
                    id="name"
                    v-model="form.name"
                    :error="errors.name"
                    type="text"
                    placeholder="Введите имя"
                />
            </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.email">
            <VFormField>
                <VFormLabel for="email">
                    Ваш email *
                </VFormLabel>
                <VFormInput
                    id="email"
                    v-model="form.email"
                    :error="errors.email"
                    type="email"
                    placeholder="Введите email"
                />
            </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.phone">
            <VFormField>
                <VFormLabel for="phone">
                    Ваш телефон *
                </VFormLabel>
                <VFormInput
                    id="phone"
                    v-model="form.phone"
                    maska="+7 (###) ### ## ##"
                    :error="errors.phone"
                    type="tel"
                    placeholder="Введите телефон"
                />
            </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.address">
            <VFormField>
                <VFormLabel for="address">
                    Адрес доставки
                </VFormLabel>
                <VFormInput
                    id="address"
                    v-model="form.address"
                    :error="errors.address"
                    type="text"
                    placeholder="Если необходимо"
                />
            </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.communication">
            <VFormField>
                <VFormLabel for="communication">
                    Как с вами связаться?
                </VFormLabel>
                <VFormSelect
                    id="communication"
                    v-model="form.communication"
                    :error="errors.address"
                    placeholder="Способ связи"
                    :options="options"
                />
            </VFormField>
        </VFormBlock>
    </VForm>
</template>
