<script setup lang="ts">
import type { IFeedback, ISettings } from '@/types/api'
import { yandexMap } from '@/helpers'

const form = reactive<IFeedback>({
    name: '',
    email: '',
    phone: '',
    message: '',
})

const mapRoot = ref<HTMLElement | null>(null)

const settings = useState<ISettings>('settings')

const formattedPhone = computed(() => settings.value.phone?.replace(/\s+/g, ''))

function handleForm() {
    return useFetcher<IFeedback>('/api/feedback', {
        body: form,
        method: 'post',
    })
}

const {
    submit: handleSubmit,
    isLoading,
    validationErrors: errors,
    succeeded: isFormSent,
} = useSubmit(
    () => {
        return handleForm()
    },
    {
        onSuccess: () => {
            clearForm()
        },
    },
)

function clearForm() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    errors.value = {}
}

onMounted(() => {
    if (mapRoot.value) {
        yandexMap(mapRoot.value)
    }
})
</script>

<template>
    <div>
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
                                <a class="contacts__value" :href="`tel:${formattedPhone}`">{{ settings.phone }}</a>
                            </div>
                            <div class="contacts__block">
                                <p class="contacts__label">
                                    Email
                                </p>
                                <a class="contacts__value" :href="`mailto:${settings.email}`">{{ settings.email }}</a>
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
                                    <NuxtLink v-if="settings.vk" target="_blank" title="VK" :href="settings.vk" class="contacts__social">
                                        <img src="/images/icons/vk.svg" alt="VK" loading="lazy">
                                    </NuxtLink>
                                    <NuxtLink v-if="settings.telegram" target="_blank" title="Telegram" :href="settings.telegram" class="contacts__social">
                                        <img src="/images/icons/tg.svg" alt="Telegram" loading="lazy">
                                    </NuxtLink>
                                    <NuxtLink v-if="settings.whatsapp" target="_blank" title="WhatsApp" :href="settings.whatsapp" class="contacts__social">
                                        <img src="/images/icons/wa.svg" alt="WhatsApp" loading="lazy">
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div ref="mapRoot" data-map data-coordinates="57.13980556751723,65.55675849999999" class="contacts__map" />
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
                                            Ваш email
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
                                        <VFormTextarea
                                            id="message"
                                            v-model="form.message"
                                            :error="errors.message"
                                            placeholder="Напишите нам сообщение"
                                        />
                                    </VFormField>
                                </VFormBlock>
                            </VForm>
                        </div>
                        <div class="contacts-form__footer">
                            <UiButton :disabled="isFormSent || isLoading" class="contacts-form__button" @click="handleSubmit">
                                {{ isFormSent ? 'Отправлено' : 'Отправить' }}
                            </UiButton>
                            <p class="contacts-form__policy">
                                Нажимая на кнопку «Отправить», я принимаю условия <NuxtLink to="/info/offer">
                                    публичной оферты
                                </NuxtLink> и <NuxtLink to="/info/privacy">
                                    политики конфиденциальности
                                </NuxtLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.contacts {
    // .contacts__body
    &__body {
        display: flex;
        justify-content: space-between;

        @include adaptive-value('gap', 60, 30);

        @media (max-width: $mobile) {
            display: grid;
            justify-content: unset;
        }
    }

    // .contacts__wrapper
    &__wrapper {
        display: grid;
        flex: 0 1 rem(1000);

        @include adaptive-value('gap', 40, 30);
    }

    // .contacts__blocks
    &__blocks {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-self: start;

        @include adaptive-value('gap', 20, 16);
    }

    // .contacts__block
    &__block {
        display: grid;
        gap: rem(2);
    }

    // .contacts__label
    &__label {
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 14, 12);
    }

    // .contacts__value
    &__value {
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        @include adaptive-value('font-size', 18, 16);

        &:link {
            @media (any-hover: hover) {
                &:hover {
                    color: $accentColor;
                }
            }
        }
    }

    // .contacts__socials
    &__socials {
        display: flex;
        gap: rem(6);
        align-items: center;
    }

    // .contacts__social
    &__social {
        transition: transform 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                transform: scale(1.05);
            }
        }
    }

    // .contacts__map
    &__map {
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: rem(4);

        @media (max-width: $mobile) {
            height: rem(400);
        }
    }

    // .contacts__form
    &__form {
        flex: 0 1 rem(340);
        min-width: rem(280);
    }
}

.contacts-form {
    // .contacts-form__label
    &__label {
        margin-bottom: rem(10);
        line-height: 140%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;

        @include adaptive-value('font-size', 14, 12);
    }

    // .contacts-form__footer
    &__footer {
        display: grid;
        gap: rem(10);
        margin-top: rem(20);
    }

    // .contacts-form__button
    &__button {
        width: 100%;
    }

    // .contacts-form__policy
    &__policy {
        font-size: rem(14);
        line-height: 140%;

        a {
            text-decoration: underline;
            text-decoration-thickness: 10%;
            text-decoration-style: dotted;
            transition: color 0.3s ease-in-out;

            @media (any-hover: hover) {
                &:hover {
                    color: $accentColor;
                }
            }
        }

        @media (max-width: $mobile) {
            text-align: center;
        }
    }
}
</style>
