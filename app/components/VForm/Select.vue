<script setup lang="ts">
const props = defineProps<{
    modelValue: any
    options: any
    placeholder: string
    isError?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
    (e: 'clearError'): void
}>()

defineExpose({ openOptions })

const isOptionsOpen = ref(false)

const selectedOption = computed(() => {
    if (!props.modelValue)
        return props.placeholder
    return props.modelValue.name
})

function toggleOption(option: any) {
    isOptionsOpen.value = false
    emit('update:modelValue', option)
}

function openOptions() {
    isOptionsOpen.value = true
    emit('clearError')
}

function closeOptions() {
    isOptionsOpen.value = false
}
</script>

<template>
    <div v-click-outside="closeOptions" class="product__select select" :class="{ 'select--opened': isOptionsOpen, 'select--error': isError }">
        <div class="select__selected" @click="openOptions">
            <span>{{ selectedOption }}</span>
            <UiIcon class="select__icon" name="arrow-down" size="10" />
        </div>
        <Transition name="slide">
            <ul v-if="isOptionsOpen" class="select__options">
                <li
                    v-for="option in options"
                    :key="option.id"
                    class="select__option"
                    :class="{
                        'select__option--active': modelValue?.id === option.id,
                        'select__option--disabled': option.disabled,
                    }"
                    :value="option.value"
                    @click.stop="toggleOption(option)"
                >
                    {{ option.name }}
                </li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss">
.select {
    position: relative;

    // .select__selected
    &__selected {
        display: flex;
        gap: rem(30);
        align-items: center;
        justify-content: space-between;
        padding: rem(5) rem(16);
        font-size: rem(14);
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid $extraColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;

        @include adaptive-value('height', 45, 40);

        @media (any-hover: hover) {
            &:hover {
                border-color: $accentColor;
            }
        }

        svg {
            transition: transform 0.3s ease-in-out;
        }

        .select--opened & {
            svg {
                transform: rotate(-180deg);
            }
        }

        .select--error & {
            border-color: $redColor;
        }
    }

    // .select__options
    &__options {
        position: absolute;
        top: calc(100% + 4px);
        z-index: 10;
        display: grid;
        width: 100%;
        overflow: hidden;
        background-color: $whiteColor;
        border-radius: 0 0 rem(4) rem(4);
        box-shadow: 0 0 14px 0 rgb(0 0 0 / 10%);

        @include adaptive-value('font-size', 16, 14);
    }

    // .select__option
    &__option {
        padding: rem(5) rem(16);
        font-size: rem(16);
        line-height: 125%;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &--active {
            color: $whiteColor;
            background-color: $accentColor;
        }

        &--disabled {
            opacity: 0.5;
        }

        @media (any-hover: hover) {
            &:hover {
                color: $whiteColor;
                background-color: $accentColor;
            }
        }
    }

    // .select__icon
    &__icon {
        flex-shrink: 0;
    }
}

.slide-enter-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-5px) scale(0.9);
}
</style>
