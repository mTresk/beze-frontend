<template>
    <div class="policy">
        Подтвеждаю <NuxtLink
            target="_blank"
            to="/info/processing"
        >
            согласие с обработкой моих персональных данных
        </NuxtLink> и <NuxtLink
            target="_blank"
            to="/info/privacy"
        >
            политикой конфиденциальности
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.policy {
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
}
</style>
