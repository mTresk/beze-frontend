<template>
    <div>
        <section class="auth spacer">
            <div class="auth__container">
                <slot v-if="$slots.header" name="header" />
                <div v-if="$slots.status" class="auth__status">
                    <slot name="status" />
                </div>

                <div v-if="$slots.body" class="auth__body">
                    <slot name="body" />
                </div>
                <div v-if="$slots.footer" class="auth__footer">
                    <slot name="footer">
                        <div class="auth__policy">
                            Нажимая на кнопку, вы соглашаетесь с условиями по обработке персональных данных, согласно <NuxtLink to="/info/privacy">
                                политики конфиденциальности
                            </NuxtLink>
                        </div>
                    </slot>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.auth {
    // .auth__body
    &__body {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: rem(360);
        margin-inline: auto;
    }

    &__status {
        display: grid;
        max-width: rem(800);
        margin-inline: auto;

        @include adaptive-value('margin-bottom', 30, 20);
        @include adaptive-value('gap', 20, 10);
    }

    &__form {
        width: 100%;
    }

    // .auth__footer
    &__footer {
        display: grid;
        gap: rem(10);
        max-width: rem(360);
        margin-inline: auto;

        @include adaptive-value('margin-top', 20, 16);
    }

    // .auth__links
    &__links {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
    }

    // .auth__link
    &__link {
        text-align: center;
    }

    // .auth__policy
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
    }
}
</style>
