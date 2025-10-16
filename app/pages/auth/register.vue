<script setup lang="ts">
import type { IRegisterCredentials } from '@/types/api'
import * as z from 'zod'

definePageMeta({
  middleware: ['guest'],
})

const { register } = useAuth()

const isAgreementAccepted = ref(false)
const formErrors = ref()

const form = reactive<IRegisterCredentials>({
  name: '',
  surname: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ error: 'Поле обязательно.' })
    .max(255, { error: 'Максимум 255 символов.' }),
  surname: z
    .string()
    .nonempty({ error: 'Поле обязательно.' })
    .max(255, { error: 'Максимум 255 символов.' }),
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

const { submit: submitForm, isLoading, validationErrors } = useSubmit(
  () => register(form),
  {
    onSuccess: () => navigateTo('/personal'),
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
        <LayoutBreadcrumb
          :items="[
            { title: 'Регистрация' },
          ]"
        />
        <UiPageTitle>Регистрация</UiPageTitle>
      </template>
      <template #body>
        <VForm>
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
        <VFormCheckbox v-model="isAgreementAccepted">
          <VFormPolicy />
        </VFormCheckbox>
        <UiButton
          wide
          :is-loading="isLoading"
          :disabled="!isAgreementAccepted"
          @click="handleForm"
        >
          Зарегистрироваться
        </UiButton>
        <UiLink
          class="auth__link"
          href="/auth/login"
        >
          Уже есть аккаунт?
        </UiLink>
      </template>
    </LayoutAuth>
  </div>
</template>
