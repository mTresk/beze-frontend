<script setup lang="ts">
import type { IOrder, IUser, ValidationErrors } from '@/types/api'

defineProps<{
    errors: ValidationErrors
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: typeof form | null): void
}>()

const user: Ref<IUser | null> = useSanctumUser()

const options = [
    { id: 1, name: 'Телефон' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Telegram' },
    { id: 4, name: 'WhatsApp' },
]

const form = reactive<Partial<IOrder>>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    communication: undefined,
})

function populateFormWithUserData() {
    if (!user.value)
        return

    form.name = user.value.name || ''
    form.surname = user.value.surname || ''
    if (user.value.email) {
        form.email = user.value.email
    }
    if (user.value.profile) {
        form.phone = user.value.profile.phone || ''
        form.address = user.value.profile.address || ''

        if (user.value.profile.communication) {
            const communicationOption = options.find(
                option => option.name.toLowerCase() === user.value?.profile?.communication?.toLowerCase(),
            )
            if (communicationOption) {
                form.communication = communicationOption
            }
        }
    }

    emit('update:modelValue', form)
}

watch(user, () => {
    populateFormWithUserData()
}, { immediate: true })

watch(form, (newForm) => {
    emit('update:modelValue', newForm)
}, { deep: true })
</script>

<template>
    <VForm>
        <VFormBlock :error="errors.name">
            <VFormField>
                <VFormLabel for="name">
                    Имя*
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
        <VFormBlock :error="errors.surname">
            <VFormField>
                <VFormLabel for="surname">
                    Фамилия*
                </VFormLabel>
                <VFormInput
                    id="surname"
                    v-model="form.surname"
                    :error="errors.surname"
                    type="text"
                    placeholder="Введите фамилию"
                />
            </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.email">
            <VFormField>
                <VFormLabel for="email">
                    Email*
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
                    Телефон *
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
                    Адрес доставки*
                </VFormLabel>
                <VFormDaData
                    v-model="form.address"
                    placeholder="Введите адрес"
                    input-id="address"
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
