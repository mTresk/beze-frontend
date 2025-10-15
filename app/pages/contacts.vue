<script setup lang="ts">
import type { ISettings } from '@/types/api'

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

const formattedPhone = computed(() => formatPhone(settings?.value?.phone))

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
          <ContactForm class="contacts__form">
            <template #label>
              Напишите нам
            </template>
          </ContactForm>
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
    align-items: start;
    align-self: start;

    @include adaptive-value('gap', 20, 16);

    @media (max-width: $mobileSmall) {
      grid-template-columns: 1fr;
    }
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
</style>
