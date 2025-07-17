<script setup lang="ts">
const isVisible = ref(false)

const cookieConsent = useCookie('cookie-consent', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
})

function handleAccept() {
    cookieConsent.value = true
    isVisible.value = false
}

onMounted(() => {
    if (!cookieConsent.value) {
        isVisible.value = true
    }
})
</script>

<template>
    <div
        v-if="isVisible"
        class="cookie"
    >
        <div class="cookie__content">
            <div class="cookie__text">
                Пользуясь сайтом, вы соглашаетесь с использованием cookies и <UiLink
                    medium
                    href="/info/privacy"
                >
                    политикой конфиденциальности
                </UiLink>.
            </div>
            <UiButton
                small
                @click="handleAccept"
            >
                Хорошо
            </UiButton>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cookie {
    position: fixed;
    right: rem(20);
    bottom: rem(20);
    z-index: 200;
    width: 100%;
    max-width: rem(400);
    padding: rem(16) rem(20);
    background-color: $whiteColor;
    border-radius: rem(4);
    box-shadow: 0 0 rem(10) rgba($mainColor, 0.1);

    @media (max-width: $tablet) {
        bottom: rem(80);
    }

    @media (max-width: $mobileSmall) {
        width: calc(100% - rem(40));
        max-width: none;
    }

    &__content {
        display: grid;
        gap: rem(10);

        @media (max-width: $mobile) {
            justify-items: start;
        }
    }

    &__text {
        line-height: 140%;

        @include adaptive-value('font-size', 18, 16);
    }
}
</style>
