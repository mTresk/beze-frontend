<script setup lang="ts">
definePageMeta({
    middleware: ['guest'],
})

const { register } = useAuth()

const form = reactive({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const {
    submit: submitForm,
    isLoading,
    validationErrors: errors,
} = useSubmit(
    () => {
        return register(form)
    },
    {
        onSuccess: () => navigateTo('/personal'),
    },
)
</script>

<template>
    <div>
        <LayoutAuth>
            <template #header>
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Регистрация' },
                    ]"
                />
                <UiPageTitle>Регистрация</UiPageTitle>
            </template>
            <template #body>
                <VForm @submit.prevent="submitForm">
                    <VFormBlock :error="errors.name">
                        <VFormField>
                            <VFormLabel for="name">
                                Ваше имя*
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
                    <VFormBlock :error="errors.surname ">
                        <VFormField>
                            <VFormLabel for="surname">
                                Ваша фамилия*
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
                                Ваш email*
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
                    <VFormBlock :error="errors.password">
                        <VFormField>
                            <VFormLabel for="password">
                                Пароль*
                            </VFormLabel>
                            <VFormInput
                                id="password"
                                v-model="form.password"
                                :error="errors.password"
                                type="password"
                                placeholder="Введите пароль"
                            />
                        </VFormField>
                    </VFormBlock>
                    <VFormBlock :error="errors.password_confirmation">
                        <VFormField>
                            <VFormLabel for="password_confirmation">
                                Подтвердите пароль*
                            </VFormLabel>
                            <VFormInput
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                :error="errors.password_confirmation"
                                type="password"
                                placeholder="Введите пароль ещё раз"
                            />
                        </VFormField>
                    </VFormBlock>
                </VForm>
            </template>
            <template #footer>
                <UiButton wide :is-loading="isLoading" type="submit" @click="submitForm">
                    Зарегистрироваться
                </UiButton>
                <p class="auth__policy">
                    Нажимая на кнопку «Зарегистрироваться», я принимаю условия  <NuxtLink target="_blank" to="/info/privacy">
                        политики конфиденциальности
                    </NuxtLink>
                </p>
                <UiLink class="auth__link" href="/auth/login">
                    Уже есть аккаунт?
                </UiLink>
            </template>
        </LayoutAuth>
    </div>
</template>
