<script setup lang="ts">
import type { IResetPasswordCredentials } from '@/types/api'
import * as z from 'zod'

definePageMeta({
  middleware: ['guest'],
})

const route = useRoute()
const { resetPassword } = useAuth()

if (!route.query.email) {
  navigateTo('/')
}

const formErrors = ref()

const form = reactive<IResetPasswordCredentials>({
  email: route.query.email as string,
  password: '',
  password_confirmation: '',
  token: route.params.token as string,
})

const formSchema = z.object({
  email: z
    .email({ error: 'Значение поля должно быть электронной почтой.' }),
  password: z
    .string()
    .nonempty({ error: 'Поле обязательно.' })
    .min(8, { error: 'Пароль должен быть минимум 8 символов.' }),
  password_confirmation: z
    .string()
    .nonempty({ error: 'Поле обязательно.' })
    .min(8, { error: 'Пароль должен быть минимум 8 символов.' }),
}).refine(data => data.password === data.password_confirmation, {
  message: 'Пароли не совпадают.',
  path: ['password_confirmation'],
})

const { submit: submitForm, isLoading, validationErrors } = useSubmit<{ status: string }>(
  () => resetPassword(form),
  {
    onSuccess: result =>
      navigateTo({
        path: '/auth/login',
        query: { reset: result?.status ?? '' },
      }),
  },
)

function handleForm() {
  const result = formSchema.safeParse(form)

  if (!result.success) {
    formErrors.value = z.flattenError(result.error).fieldErrors

    useToastify('Проверьте введенные данные', { type: 'error' })
  }
  else {
    submitForm()
  }
}

const errors = computed(() => ({ ...formErrors.value, ...validationErrors.value }))
</script>

<template>
  <div>
    <LayoutAuth>
      <template #header>
        <LayoutBreadcrumb :items="[{ title: 'Новый пароль' }]" />
        <UiPageTitle>Введите новый пароль</UiPageTitle>
      </template>
      <template #body>
        <VForm>
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
          @click="handleForm"
        >
          Сбросить пароль
        </UiButton>
      </template>
    </LayoutAuth>
  </div>
</template>
