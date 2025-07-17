<script setup lang="ts">
definePageMeta({
    middleware: ['unverified'],
})

const { resendEmailVerification } = useAuth()

const verificationIsSent = ref(false)

const {
    submit: handleResendVerification,
    isLoading,
} = useSubmit(
    () => {
        return resendEmailVerification()
    },
    {
        onSuccess: (result) => {
            if (result?.status === 'verification-link-sent') {
                verificationIsSent.value = true
            }
        },
    },
)
</script>

<template>
    <div>
        <LayoutAuth>
            <template #header>
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Верификация' },
                    ]"
                />
                <UiPageTitle>Подтверждение email</UiPageTitle>
            </template>
            <template #status>
                <UiStatus v-if="!verificationIsSent">
                    Спасибо за регистрацию! Прежде чем начать, не могли бы вы подтвердить свой адрес электронной почты, перейдя по
                    ссылке, которую мы только что отправили вам по электронной почте? Если вы не получили письмо, мы с радостью
                    вышлем вам другое.
                </UiStatus>
                <UiStatus v-if="!verificationIsSent">
                    На адрес электронной почты, который вы указали при регистрации, была отправлена новая ссылка для
                    подтверждения.
                </UiStatus>
                <UiStatus v-if="verificationIsSent">
                    Ссылка для подтверждения электронной почты отправлена.
                </UiStatus>
            </template>
            <template
                v-if="!verificationIsSent"
                #footer
            >
                <UiButton
                    wide
                    :disabled="isLoading"
                    type="submit"
                    @click="handleResendVerification"
                >
                    Отправить повторно
                </UiButton>
            </template>
        </LayoutAuth>
    </div>
</template>
