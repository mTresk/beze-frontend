<script setup lang="ts">
definePageMeta({
    middleware: ['guest'],
})

const { forgotPassword } = useAuth()

const email = ref('')

const resetEmailSent = ref(false)

const status = ref('')

const {
    submit: submitForm,
    isLoading,
    validationErrors: errors,
} = useSubmit(
    () => {
        status.value = ''
        return forgotPassword(email.value)
    },
    {
        onSuccess: (result) => {
            status.value = result?.status ?? ''
            resetEmailSent.value = true
        },
    },
)
</script>

<template>
    <div>
        <LayoutAuth>
            <template #header>
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Восстановление пароля' },
                    ]"
                />
                <UiPageTitle>Восстановление пароля</UiPageTitle>
            </template>
            <template
                v-if="status"
                #status
            >
                <UiStatus>
                    {{ status }}
                </UiStatus>
            </template>
            <template
                v-if="!resetEmailSent"
                #body
            >
                <VForm @submit.prevent="submitForm">
                    <VFormBlock :error="errors.email">
                        <VFormField>
                            <VFormLabel for="email">
                                Ваш email*
                            </VFormLabel>
                            <VFormInput
                                id="email"
                                v-model="email"
                                :error="errors.email"
                                type="email"
                                placeholder="Введите email"
                            />
                        </VFormField>
                    </VFormBlock>
                </VForm>
            </template>
            <template
                v-if="!resetEmailSent"
                #footer
            >
                <UiButton
                    wide
                    :is-loading="isLoading"
                    type="submit"
                    @click="submitForm"
                >
                    Восстановить пароль
                </UiButton>
            </template>
        </LayoutAuth>
    </div>
</template>
