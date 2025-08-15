<script setup lang="ts">
const props = defineProps<{
  modelValue: any
  options: any
  placeholder: string
  isError?: boolean
  id?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'clearError'): void
}>()

defineExpose({ openOptions })

const isOptionsOpen = ref(false)

const highlightedIndex = ref(-1)

const selectedOption = computed(() => {
  if (!props.modelValue) {
    return props.placeholder
  }

  return props.modelValue.name
})

function toggleOption(option: any) {
  isOptionsOpen.value = false
  emit('update:modelValue', option)
}

function openOptions() {
  isOptionsOpen.value = true

  if (props.modelValue) {
    const selectedIndex = props.options?.findIndex((option: any) => option.id === props.modelValue.id) ?? 0
    highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
  }
  else {
    highlightedIndex.value = 0
  }

  emit('clearError')
}

function closeOptions() {
  isOptionsOpen.value = false
  highlightedIndex.value = -1
}

function toggleOptions() {
  if (isOptionsOpen.value) {
    closeOptions()
  }
  else {
    openOptions()
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (isOptionsOpen.value && highlightedIndex.value >= 0) {
      const selectedOption = props.options[highlightedIndex.value]
      if (selectedOption) {
        toggleOption(selectedOption)
      }
    }
    else {
      openOptions()
    }
  }
  else if (event.key === 'Escape') {
    closeOptions()
  }
  else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!isOptionsOpen.value) {
      openOptions()
    }
    else {
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        props.options.length - 1,
      )
    }
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (isOptionsOpen.value) {
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    }
  }
}
</script>

<template>
  <div
    v-click-outside="closeOptions"
    class="product__select select"
    :class="{ 'select--opened': isOptionsOpen, 'select--error': isError }"
  >
    <input
      :id="id"
      class="select__hidden-input"
      readonly
      tabindex="-1"
    >
    <div
      class="select__selected"
      role="combobox"
      :aria-expanded="isOptionsOpen"
      :aria-haspopup="true"
      aria-label="Выберите опцию"
      tabindex="0"
      @click="toggleOptions"
      @keydown="handleKeyDown"
    >
      <span>{{ selectedOption }}</span>
      <UiIcon
        class="select__icon"
        name="arrow-down"
        size="10"
      />
    </div>
    <Transition name="slide">
      <ul
        v-if="isOptionsOpen"
        class="select__options"
        role="listbox"
      >
        <li
          v-for="(option, index) in options"
          :key="option.id"
          class="select__option"
          role="option"
          :class="{
            'select__option--active': modelValue?.id === option.id,
            'select__option--highlighted': highlightedIndex === index,
            'select__option--disabled': option.disabled,
          }"
          :aria-selected="modelValue?.id === option.id"
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

  &__hidden-input {
    display: none;
  }

  &__selected {
    display: flex;
    gap: rem(30);
    align-items: center;
    justify-content: space-between;
    padding: rem(5) rem(16);
    font-size: rem(14);
    white-space: nowrap;
    cursor: pointer;
    border: rem(1) solid $extraColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    @include adaptive-value('height', 45, 40);

    &:focus {
      border-color: $accentColor;
    }

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

  &__options {
    position: absolute;
    top: calc(100% + rem(4));
    z-index: 10;
    display: grid;
    width: 100%;
    overflow: hidden;
    background-color: $whiteColor;
    border-radius: 0 0 rem(4) rem(4);
    box-shadow: 0 0 rem(14) 0 rgb(0 0 0 / 10%);

    @include adaptive-value('font-size', 16, 14);
  }

  &__option {
    padding: rem(5) rem(16);
    font-size: rem(16);
    line-height: 125%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &--active,
    &--highlighted {
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
  transform: translateY(rem(-5)) scale(0.9);
}
</style>
