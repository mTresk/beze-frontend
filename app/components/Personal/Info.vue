<script setup lang="ts">
import type { IUser, ValidationErrors } from '@/types/api'

const client = useSanctumClient()
const user: Ref<IUser | null> = useSanctumUser()

const options = [
    { id: 1, name: 'Телефон' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Telegram' },
    { id: 4, name: 'WhatsApp' },
]

const form = reactive({
    name: '',
    surname: '',
    address: '',
    phone: '',
    delivery_type: '',
    communication: undefined as typeof options[0] | undefined,
})

const errors = ref<ValidationErrors>({})

function populateFormWithUserData() {
    if (!user.value)
        return

    form.name = user.value.name || ''
    form.surname = user.value.surname || ''
    if (user.value.profile) {
        form.address = user.value.profile.address || ''
        form.phone = user.value.profile.phone || ''
        form.delivery_type = user.value.profile.deliveryType || ''

        if (user.value.profile.communication) {
            const communicationOption = options.find(
                option => option.name.toLowerCase() === user.value?.profile?.communication?.toLowerCase(),
            )
            if (communicationOption) {
                form.communication = communicationOption
            }
        }
    }
}

watch(user, () => {
    populateFormWithUserData()
}, { immediate: true })

async function handleUpdateProfile() {
    return client('/api/user', {
        method: 'put',
        body: {
            ...form,
            communication: form.communication?.name,
        },
    })
}

const {
    submit: handleSubmit,
    isLoading,
    validationErrors,
} = useSubmit(
    () => handleUpdateProfile(),
    {
        onSuccess: () => {
            if (user.value?.profile) {
                user.value.profile.address = form.address
                user.value.profile.phone = form.phone
                user.value.profile.communication = form.communication?.name
            }
            user.value && (user.value.name = form.name)
            user.value && (user.value.surname = form.surname)

            useToastify('Данные успешно обновлены', { type: 'success' })
        },
    },
)

watch(validationErrors, (newErrors) => {
    errors.value = newErrors
})
</script>

<template>
    <div class="personal-info">
        <div class="personal-info__form">
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
                <VFormBlock :error="errors.phone">
                    <VFormField>
                        <VFormLabel for="phone">
                            Телефон*
                        </VFormLabel>
                        <VFormInput
                            id="phone"
                            v-model="form.phone"
                            :error="errors.phone"
                            type="tel"
                            maska="+7 (###) ### ## ##"
                            placeholder="Введите телефон"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.address">
                    <VFormField>
                        <VFormLabel for="address">
                            Адрес доставки
                        </VFormLabel>
                        <VFormDaData
                            id="address"
                            v-model="form.address"
                            :error="errors.address"
                            placeholder="Введите адрес доставки"
                            type="address"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.communication">
                    <VFormField>
                        <VFormLabel for="communication">
                            Предпочитаемый способ связи*
                        </VFormLabel>
                        <VFormSelect
                            id="communication"
                            v-model="form.communication"
                            :error="errors.communication"
                            :options="options"
                            placeholder="Выберите способ связи"
                        />
                    </VFormField>
                </VFormBlock>
            </VForm>
            <div class="personal-info__footer">
                <UiButton
                    :is-loading="isLoading"
                    @click="handleSubmit"
                >
                    Сохранить
                </UiButton>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.personal-info {
    &__form {
        max-width: rem(500);
    }

    &__footer {
        margin-top: rem(20);
    }
}
</style>
