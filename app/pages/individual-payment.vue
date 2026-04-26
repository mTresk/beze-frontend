<script setup lang="ts">
import * as z from 'zod'

const client = useSanctumClient()

const isAgreementAccepted = ref(false)
const formErrors = ref()

const form = reactive({
  amount: '' as string | number,
  email: '',
})

const formSchema = z.object({
  amount: z.coerce
    .number({
      error: 'Поле обязательно.',
    })
    .min(1, { error: 'Минимальная сумма: 1 ₽.' }),
  email: z
    .email({ error: 'Значение поля должно быть электронной почтой.' })
    .or(z.literal('')),
})

const { submit: submitPayment, isLoading, validationErrors } = useSubmit(
  () => client<string>('/api/payments/create/individual', {
    method: 'post',
    body: {
      amount: Number(form.amount),
      email: form.email || undefined,
    },
  }),
  {
    onSuccess: (response: string) => {
      window.location.href = response
    },
  },
)

function handleForm(): void {
  const result = formSchema.safeParse(form)

  if (!result.success) {
    formErrors.value = z.flattenError(result.error).fieldErrors
    useToastify('Проверьте введенные данные', { type: 'error' })

    return
  }

  submitPayment()
}

const errors = computed(() => ({ ...formErrors.value, ...validationErrors.value }))

const seoTitle = 'Оплата заказа'
const seoDescription = 'Оплата пошива по индивидуальному заказу'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/individual-payment`)
</script>

<template>
  <div>
    <Head>
      <Title>{{ seoTitle }}</Title>
      <Meta
        name="description"
        :content="seoDescription"
      />
      <Meta
        property="og:description"
        :content="seoDescription"
      />
      <Meta
        name="twitter:description"
        :content="seoDescription"
      />
      <Link
        rel="canonical"
        :href="canonicalUrl"
      />
    </Head>
    <section class="individual-payment spacer">
      <div class="individual-payment__container">
        <LayoutBreadcrumb
          :items="[
            { title: 'Оплата заказа' },
          ]"
        />
        <UiPageTitle>Оплата заказа</UiPageTitle>
        <div class="individual-payment__content">
          <VForm class="individual-payment__form">
            <VFormBlock :error="errors.amount">
              <VFormField>
                <VFormLabel for="amount">
                  Сумма, ₽ *
                </VFormLabel>
                <VFormInput
                  id="amount"
                  v-model="form.amount"
                  type="number"
                  :error="errors.amount"
                  placeholder="Введите сумму"
                />
              </VFormField>
            </VFormBlock>
            <VFormBlock :error="errors.email">
              <VFormField>
                <VFormLabel for="email">
                  Email
                </VFormLabel>
                <VFormInput
                  id="email"
                  v-model="form.email"
                  type="email"
                  :error="errors.email"
                  placeholder="Введите email (для отправки чека)"
                />
              </VFormField>
            </VFormBlock>
          </VForm>
          <div class="individual-payment__footer">
            <VFormCheckbox v-model="isAgreementAccepted">
              <VFormPolicy />
            </VFormCheckbox>
            <UiButton
              :disabled="!isAgreementAccepted"
              :is-loading="isLoading"
              class="individual-payment__button"
              @click="handleForm"
            >
              Перейти к оплате
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.individual-payment {
  &__content {
    display: grid;
    gap: rem(20);
    max-width: rem(540);
  }

  &__description {
    font-size: rem(16);
    line-height: 140%;
  }

  &__form {
    display: grid;
    gap: rem(16);
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
