<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const route = useRoute()

const { completeRegistration } = useAuth()

if (!route.query.email) {
  navigateTo('/')
}

const form = reactive({
  email: route.query.email as string,
  password: '',
  password_confirmation: '',
})

const token = computed(() => route.params.token)

const {
  submit: submitForm,
  isLoading,
  validationErrors: errors,
} = useSubmit<{ status: string }>(() => completeRegistration({ token: token.value as string, ...form }), {
  onSuccess: result =>
    navigateTo({
      path: '/personal',
      query: { reset: result?.status ?? '' },
    }),
})
</script>

<template>
  <div>
    <LayoutAuth>
      <template #header>
        <LayoutBreadcrumb :items="[{ title: 'Завершение регистрации' }]" />
        <UiPageTitle>Введите пароль</UiPageTitle>
      </template>
      <template #body>
        <VForm @submit.prevent="submitForm">
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
        <UiButton
          wide
          :is-loading="isLoading"
          type="submit"
          @click="submitForm"
        >
          Завершить регистрацию
        </UiButton>
      </template>
    </LayoutAuth>
  </div>
</template>
