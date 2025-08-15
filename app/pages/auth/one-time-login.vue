<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const { oneTimeLogin } = useAuth()

const route = useRoute()

const form = reactive({
  email: route.query.email as string,
  password: '',
})

const {
  submit: handleOneTimePassword,
  isLoading,
  validationErrors: errors,
} = useSubmit(
  () => {
    return oneTimeLogin(form)
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
            { title: 'Вход' },
          ]"
        />
        <UiPageTitle>Вход в личный кабинет</UiPageTitle>
      </template>
      <template
        #status
      >
        <UiStatus>
          Введите одноразовый код, который мы отправили на адрес {{ route.query.email }}
        </UiStatus>
      </template>
      <template #body>
        <VForm
          id="login-form"
          @submit.prevent="handleOneTimePassword"
        >
          <VFormBlock :error="errors.password">
            <VFormField>
              <VFormLabel for="password">
                Одноразовый код*
              </VFormLabel>
              <VFormInput
                id="password"
                v-model="form.password"
                :error="errors.password"
                type="password"
                placeholder="Введите код"
              />
            </VFormField>
          </VFormBlock>
        </VForm>
      </template>
      <template #footer>
        <UiButton
          wide
          form="login-form"
          :is-loading="isLoading"
          type="submit"
        >
          Войти
        </UiButton>
      </template>
    </LayoutAuth>
  </div>
</template>
