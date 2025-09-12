<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const route = useRoute()
const { login } = useSanctumAuth()
const { oneTimePassword } = useAuth()

const form = reactive({
  email: '',
  password: '',
  remember: true,
})

const status = ref((route.query.reset ?? '').length > 0 ? (route.query.reset as string) : '')

const { submit: submitForm, isLoading: isLoadingLogin, validationErrors: errorsLogin } = useSubmit(
  () => {
    status.value = ''

    return login(form)
  },
)

const { submit: handleOneTimePassword, isLoading: isLoadingOneTimePassword, validationErrors: errorsOneTimePassword } = useSubmit(
  () => oneTimePassword(form.email),
  {
    onSuccess: () => navigateTo(`/auth/one-time-login?email=${encodeURIComponent(form.email)}`),
  },
)

const isLoading = computed(() => isLoadingLogin.value || isLoadingOneTimePassword.value)
const errors = computed(() => ({ ...errorsLogin.value, ...errorsOneTimePassword.value }))
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
        v-if="status"
        #status
      >
        <UiStatus>
          {{ status }}
        </UiStatus>
      </template>
      <template #body>
        <VForm
          id="login-form"
          @submit.prevent="submitForm"
        >
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
        <UiButton
          wide
          outline
          :is-loading="isLoading"
          type="button"
          @click="handleOneTimePassword"
        >
          Одноразовый пароль
        </UiButton>
        <div class="auth__links">
          <UiLink
            class="auth__link"
            href="/auth/forgot-password"
          >
            Восстановить пароль
          </UiLink>
          <UiLink
            class="auth__link"
            href="/auth/register"
          >
            Регистрация
          </UiLink>
        </div>
      </template>
    </LayoutAuth>
  </div>
</template>
