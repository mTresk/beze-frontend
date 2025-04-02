<script setup lang="ts">
import type { ValidationErrors } from '@/types/api'

defineProps<{
    errors: ValidationErrors
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: typeof form | null): void
}>()

const options = [
    { id: 1, name: 'Телефон' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Telegram' },
    { id: 4, name: 'WhatsApp' },
]

const form = reactive({
    name: '',
    email: '',
    phone: '',
    address: '',
    communication: '',
})

watch(form, (newForm) => {
    emit('update:modelValue', newForm)
}, { deep: true })
</script>

<template>
    <form class="form">
        <div class="form__body">
            <div class="form__block">
                <div class="form__field" :class="{ 'form__field--error': errors.name }">
                    <label for="name" class="form__label">Ваше имя *</label>
                    <input id="name" v-model="form.name" class="form__input" autocomplete="off" type="text" placeholder="Введите имя">
                </div>
                <small v-if="errors.name" class="form__error">{{ errors.name[0] }}</small>
            </div>
            <div class="form__block">
                <div class="form__field" :class="{ 'form__field--error': errors.email }">
                    <label for="email" class="form__label">Ваш email *</label>
                    <input id="email" v-model="form.email" class="form__input" autocomplete="off" type="text" placeholder="Введите email">
                </div>
                <small v-if="errors.email" class="form__error">{{ errors.email[0] }}</small>
            </div>
            <div class="form__block">
                <div class="form__field" :class="{ 'form__field--error': errors.phone }">
                    <label for="phone" class="form__label">Ваш телефон *</label>
                    <input id="phone" v-model="form.phone" v-maska="'+7 (###) ### ## ##'" class="form__input" autocomplete="off" type="tel" placeholder="Введите телефон">
                </div>
                <small v-if="errors.phone" class="form__error">{{ errors.phone[0] }}</small>
            </div>
            <div class="form__block">
                <div class="form__field" :class="{ 'form__field--error': errors.address }">
                    <label for="address" class="form__label">Адрес доставки</label>
                    <input id="address" v-model="form.address" class="form__input" autocomplete="off" type="text" placeholder="Если необходимо">
                </div>
                <small v-if="errors.address" class="form__error">{{ errors.address[0] }}</small>
            </div>
            <div class="form__block">
                <div class="form__field" :class="{ 'form__field--error': errors.communication }">
                    <label for="address" class="form__label">Как с вами связаться?</label>
                    <FormSelect v-model="form.communication" placeholder="Способ связи" :options="options" />
                </div>
                <small v-if="errors.communication" class="form__error">{{ errors.communication[0] }}</small>
            </div>
        </div>
    </form>
</template>

<style lang="scss">
.form {
    // .form__body
    &__body {
        display: grid;
        gap: rem(20);
    }

    // .form__block
    &__block {
        position: relative;
    }

    // .form__field
    &__field {
        display: grid;
        gap: rem(6);

        &--error {
            .form__input {
                border-color: $redColor;
            }
        }
    }

    // .form__label
    &__label {
        font-size: 16px;
        line-height: 130%;
    }

    // .form__input
    &__input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: rem(45);
        padding: rem(5) rem(16);
        font-size: 14px;
        line-height: 130%;
        border: 2px solid $extraColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;

        &::placeholder{
            color: rgb(54 54 54 / 50%);
        }

        &:focus{
            border-color: $accentColor;

            &::placeholder {
                opacity: 0;
            }
        }
    }

    // .form__error
    &__error {
        position: absolute;
        bottom: rem(-15);
        font-size: rem(12);
        color: $redColor;
    }
}
</style>
