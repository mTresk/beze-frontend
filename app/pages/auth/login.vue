<script setup lang="ts">
import * as z from 'zod'

definePageMeta({
  middleware: ['guest'],
})

const route = useRoute()
const { login } = useSanctumAuth()
const { getOneTimePassword } = useAuth()

const status = ref((route.query.reset ?? '').length > 0 ? (route.query.reset as string) : '')
const formErrors = ref()

const form = reactive({
  email: '',
  password: '',
  remember: true,
})

const formSchema = z.object({
  email: z
    .email({ error: 'Значение поля должно быть электронной почтой.' }),
  password: z
    .string()
    .nonempty({ error: 'Поле обязательно' }),
})

const { submit: submitForm, isLoading: isLoadingLogin, validationErrors: errorsLogin } = useSubmit(
  () => {
    status.value = ''

    return login(form)
  },
)

const { submit: submitOneTimePassword, isLoading: isLoadingOneTimePassword, validationErrors: errorsOneTimePassword } = useSubmit(
  () => getOneTimePassword(form.email),
  {
    onSuccess: () => navigateTo(`/auth/one-time-login?email=${encodeURIComponent(form.email)}`),
  },
)

function handleLogin() {
  const result = formSchema.safeParse(form)

  if (!result.success) {
    formErrors.value = z.flattenError(result.error).fieldErrors

    useToastify('Проверьте введенные данные', { type: 'error' })
  }
  else {
    submitForm()
  }
}

function handleOneTimeLogin() {
  const result = z
    .email('Значение поля должно быть электронным адресом')
    .safeParse(form.email)

  if (!result.success) {
    formErrors.value = { email: z.flattenError(result.error).formErrors }

    useToastify('Проверьте введенные данные', { type: 'error' })
  }
  else {
    submitOneTimePassword()
  }
}

const isLoading = computed(() => isLoadingLogin.value || isLoadingOneTimePassword.value)
const errors = computed(() => ({ ...errorsLogin.value, ...errorsOneTimePassword.value, ...formErrors.value }))
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
        <VForm>
          <VFormBlock :error="errors.email">
            <VFormField>
              <VFormLabel for="email">
                Ваша почта*
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
          :is-loading="isLoading"
          @click="handleLogin"
        >
          Войти
        </UiButton>
        <UiButton
          wide
          outline
          :is-loading="isLoading"
          @click="handleOneTimeLogin"
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
