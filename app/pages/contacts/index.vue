<script setup lang="ts">
import type { IFeedback, ISettings } from '@/types/api'
import * as z from 'zod'

const client = useSanctumClient()
const settings = useState<ISettings>('settings')

useSchemaOrg([
  defineOrganization({
    name: 'Beze Studio',
    url: 'https://bezestudio.ru',
    logo: 'https://bezestudio.ru/images/og.png',
    address: {
      '@type': 'PostalAddress',
      'addressLocality': 'Тюмень, Россия',
      'postalCode': '625048',
      'streetAddress': 'ул. Малыгина, 71',
      'url': 'https://bezestudio.ru',
    },
  }),
])

const mapRoot = ref<HTMLElement | null>(null)
const isAgreementAccepted = ref(false)
const formErrors = ref()

const form = reactive<IFeedback>({
  name: '',
  email: undefined,
  phone: '',
  message: '',
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

const formattedPhone = computed(() => formatPhone(settings?.value?.phone))

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

onMounted(() => {
  if (mapRoot.value) {
    yandexMap(mapRoot.value)
  }
})

const seoTitle = 'Контакты'
const seoDescription = 'Как с нами связаться'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/contacts`)
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
    <section class="contacts spacer">
      <div class="contacts__container">
        <LayoutBreadcrumb
          :items="[
            { title: 'Контакты' },
          ]"
        />
        <UiPageTitle>Контакты</UiPageTitle>
        <div class="contacts__body">
          <div class="contacts__wrapper">
            <div class="contacts__blocks">
              <div class="contacts__block">
                <p class="contacts__label">
                  Телефон
                </p>
                <a
                  class="contacts__value"
                  :href="`tel:${formattedPhone}`"
                >{{ settings.phone }}</a>
              </div>
              <div class="contacts__block">
                <p class="contacts__label">
                  Email
                </p>
                <a
                  class="contacts__value"
                  :href="`mailto:${settings.email}`"
                >{{ settings.email }}</a>
              </div>
              <div class="contacts__block">
                <p class="contacts__label">
                  Адрес
                </p>
                <p class="contacts__value">
                  {{ settings.address }}
                </p>
              </div>
              <div class="contacts__block">
                <p class="contacts__label">
                  Мессенджеры
                </p>
                <div class="contacts__socials">
                  <NuxtLink
                    v-if="settings.vk"
                    target="_blank"
                    title="VK"
                    :href="settings.vk"
                    class="contacts__social"
                  >
                    <img
                      src="/images/icons/vk.svg"
                      alt="VK"
                      loading="lazy"
                    >
                  </NuxtLink>
                  <NuxtLink
                    v-if="settings.telegram"
                    target="_blank"
                    title="Telegram"
                    :href="settings.telegram"
                    class="contacts__social"
                  >
                    <img
                      src="/images/icons/tg.svg"
                      alt="Telegram"
                      loading="lazy"
                    >
                  </NuxtLink>
                  <NuxtLink
                    v-if="settings.whatsapp"
                    target="_blank"
                    title="WhatsApp"
                    :href="settings.whatsapp"
                    class="contacts__social"
                  >
                    <img
                      src="/images/icons/wa.svg"
                      alt="WhatsApp"
                      loading="lazy"
                    >
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div
              ref="mapRoot"
              data-map
              data-coordinates="57.13956626772193,65.55710434322022"
              class="contacts__map"
            />
          </div>
          <div class="contacts__form contacts-form">
            <h3 class="contacts-form__label">
              Напишите нам
            </h3>
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
              <VFormCheckbox
                :checked="isAgreementAccepted"
                @update:checked="isAgreementAccepted = $event"
              >
                <template #text>
                  <VFormPolicy />
                </template>
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
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  &__body {
    display: flex;
    justify-content: space-between;

    @include adaptive-value('gap', 60, 30);

    @media (max-width: $mobile) {
      display: grid;
      justify-content: unset;
    }
  }

  &__wrapper {
    display: grid;
    flex: 0 1 rem(1000);

    @include adaptive-value('gap', 40, 30);
  }

  &__blocks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-self: start;

    @include adaptive-value('gap', 20, 16);
  }

  &__block {
    display: grid;
    gap: rem(2);
  }

  &__label {
    line-height: 140%;
    color: var(--color-gray);

    @include adaptive-value('font-size', 14, 12);
  }

  &__value {
    line-height: 140%;
    transition: color 0.3s ease-in-out;

    @include adaptive-value('font-size', 18, 16);

    &:link {
      @media (any-hover: hover) {
        &:hover {
          color: var(--color-accent);
        }
      }
    }
  }

  &__socials {
    display: flex;
    gap: rem(6);
    align-items: center;
  }

  &__social {
    transition: transform 0.3s ease-in-out;

    @media (any-hover: hover) {
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &__map {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: rem(4);

    @media (max-width: $mobile) {
      height: rem(400);
    }
  }

  &__form {
    flex: 0 1 rem(340);
    min-width: rem(280);
  }
}

.contacts-form {
  &__label {
    margin-bottom: rem(10);
    line-height: 140%;
    color: rgb(54 54 54 / 60%);
    text-transform: uppercase;

    @include adaptive-value('font-size', 14, 12);
  }

  &__footer {
    display: grid;
    gap: rem(10);
    margin-top: rem(20);
  }

  &__button {
    width: 100%;
  }
}
</style>
