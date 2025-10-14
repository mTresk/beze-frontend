<script setup lang="ts">
import * as z from 'zod'

definePageMeta({
  middleware: ['guest'],
})

const { oneTimeLogin } = useAuth()
const route = useRoute()

const formErrors = ref()

const form = reactive({
  email: route.query.email as string,
  password: '',
})

const formSchema = z.object({
  email: z
    .email({ error: 'Значение поля должно быть электронной почтой.' }),
  password: z
    .string()
    .nonempty({ error: 'Поле обязательно.' }),
})

const { submit: submitForm, isLoading, validationErrors } = useSubmit(
  () => oneTimeLogin(form),
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
        <VForm>
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
          @click="handleForm"
        >
          Войти
        </UiButton>
      </template>
    </LayoutAuth>
  </div>
</template>
