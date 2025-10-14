<script setup lang="ts">
import * as z from 'zod'

definePageMeta({
  middleware: ['guest'],
})

const { forgotPassword } = useAuth()

const email = ref('')
const resetEmailSent = ref(false)
const status = ref('')
const formErrors = ref()

const { submit: submitForm, isLoading, validationErrors } = useSubmit(
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

function handleForm() {
  const result = z
    .email('Значение поля должно быть электронной почтой.')
    .safeParse(email.value)

  if (!result.success) {
    formErrors.value = { email: z.flattenError(result.error).formErrors }

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
        <VForm>
          <VFormBlock :error="errors.email">
            <VFormField>
              <VFormLabel for="email">
                Ваша почта*
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
          @click="handleForm"
        >
          Восстановить пароль
        </UiButton>
      </template>
    </LayoutAuth>
  </div>
</template>
