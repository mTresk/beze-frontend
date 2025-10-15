<script setup lang="ts">
import type { IFeedback } from '@/types/api'
import * as z from 'zod'

interface IProps {
  productVariantId?: number
}

const props = defineProps<IProps>()

const client = useSanctumClient()

const isAgreementAccepted = ref(false)
const formErrors = ref()

const form = reactive<IFeedback>({
  name: '',
  email: undefined,
  phone: '',
  message: undefined,
  product_variant: undefined,
})

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ error: 'Поле обязательно.' }),
  phone: z
    .string()
    .nonempty({ error: 'Поле обязательно.' }),
  email: z
    .email({ error: 'Значение поля должно быть электронной почтой.' })
    .nullish(),
  message: z
    .string()
    .nullish(),
})

const { submit: submitForm, isLoading, validationErrors, succeeded: isFormSent } = useSubmit(
  () => client('/api/feedback', {
    body: form,
    method: 'post',
  }),
  {
    onSuccess: (response) => {
      useToastify(response, { type: 'success' })
      clearForm()
    },
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

function clearForm() {
  form.name = ''
  form.phone = ''
  form.email = undefined
  form.message = ''
  formErrors.value = null
  validationErrors.value = {}
}

watch(() => props.productVariantId, (newVariant) => {
  form.product_variant = newVariant
}, {
  immediate: true,
})
</script>

<template>
  <div class="contacts-form">
    <h3
      v-if="$slots.label"
      class="contacts-form__label"
    >
      <slot name="label" />
    </h3>
    <div
      v-if="$slots.title || $slots.description"
      class="contacts-form__header"
    >
      <h2 class="contacts-form__title">
        <slot name="title" />
      </h2>
      <p class="contacts-form__description">
        <slot name="description" />
      </p>
    </div>
    <div class="contacts-form__body">
      <VForm>
        <VFormBlock :error="errors.name">
          <VFormField>
            <VFormLabel for="name">
              Ваше имя *
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
        <VFormBlock :error="errors.phone">
          <VFormField>
            <VFormLabel for="phone">
              Ваш телефон *
            </VFormLabel>
            <VFormInput
              id="phone"
              v-model="form.phone"
              maska="+7 (###) ### ## ##"
              :error="errors.phone"
              type="tel"
              placeholder="Введите телефон"
            />
          </VFormField>
        </VFormBlock>
        <VFormBlock :error="errors.email">
          <VFormField>
            <VFormLabel for="email">
              Ваша почта
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
        <VFormBlock :error="errors.message">
          <VFormField>
            <VFormLabel for="message">
              Сообщение
            </VFormLabel>
            <VFormInput
              id="message"
              v-model="form.message"
              type="textarea"
              :error="errors.message"
              placeholder="Напишите нам сообщение"
            />
          </VFormField>
        </VFormBlock>
      </VForm>
    </div>
    <div class="contacts-form__footer">
      <VFormCheckbox v-model="isAgreementAccepted">
        <VFormPolicy />
      </VFormCheckbox>
      <UiButton
        :disabled="isFormSent || !isAgreementAccepted"
        :is-loading="isLoading"
        class="contacts-form__button"
        @click="handleForm"
      >
        {{ isFormSent ? 'Отправлено' : 'Отправить' }}
      </UiButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts-form {
  display: grid;
  gap: rem(20);

  &__label {
    line-height: 140%;
    color: rgb(54 54 54 / 60%);
    text-transform: uppercase;

    @include adaptive-value('font-size', 14, 12);
  }

  &__header {
    display: grid;
    gap: rem(5);
  }

  &__title {
    line-height: 125%;

    @include adaptive-value('font-size', 38, 28);
  }

  &__description {
    font-size: rem(16);
    line-height: 140%;
  }

  &__footer {
    display: grid;
    gap: rem(10);
  }

  &__button {
    width: 100%;
  }
}
</style>
