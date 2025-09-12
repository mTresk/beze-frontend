<script setup lang="ts">
interface IProps {
  modelValue: boolean
}

interface IEmits {
  'update:modelValue': [value: boolean]
  'close': []
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const { lockScroll, unlockScroll } = useScrollLock()

const dialogRef = ref<HTMLDialogElement | null>(null)

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleClose()
  }
}

function handleOpen() {
  if (!dialogRef.value) {
    return
  }

  lockScroll()
  dialogRef.value.showModal()

  emit('update:modelValue', true)
}

function handleClose() {
  if (!dialogRef.value) {
    return
  }

  dialogRef.value.setAttribute('closing', '')

  setTimeout(() => {
    if (!dialogRef.value) {
      return
    }

    dialogRef.value.close()
    dialogRef.value.removeAttribute('closing')

    emit('update:modelValue', false)
    emit('close')
  }, 300)

  unlockScroll()
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    handleOpen()
  }
  else {
    handleClose()
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="#teleports">
    <dialog
      ref="dialogRef"
      class="modal"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="modal__wrapper"
        @click="handleBackdropClick"
      >
        <div
          class="modal__content"
          @click.stop
        >
          <button
            class="modal__close"
            @click="handleClose"
          >
            <UiIcon
              size="32"
              name="close"
            />
          </button>
          <slot />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style lang="scss">
.modal {
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  opacity: 0;
  animation: modal-show 0.3s ease forwards;

  &[closing] {
    animation: modal-hide 0.3s ease forwards;
  }

  &::backdrop {
    background-color: rgb(0 0 0 / 50%);
    opacity: 0;
    animation: backdrop-show 0.3s ease forwards;
  }

  &[closing]::backdrop {
    animation: backdrop-hide 0.3s ease forwards;
  }

  &__wrapper {
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-block: rem(20);
    overflow-y: auto;

    @include adaptive-value('padding-inline', 20, 10);
  }

  &__content {
    position: relative;
    width: 100%;
    max-width: rem(600);
    margin: auto;
    background-color: var(--color-white);
    border-radius: rem(8);
    box-shadow:
      0 rem(4) rem(6) rem(-1) rgb(0 0 0 / 10%),
      0 rem(2) rem(4) rem(-1) rgb(0 0 0 / 6%);
    transform: scale(0.5);
    animation: content-show 0.3s ease forwards;

    @include adaptive-value('padding-inline', 40, 20);
    @include adaptive-value('padding-block', 60, 40);
  }

  &[closing] .modal__content {
    animation: content-hide 0.3s ease forwards;
  }

  &__close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease-in-out;

    @include adaptive-value('top', 20, 10);
    @include adaptive-value('right', 20, 10);

    svg {
      height: auto;

      @include adaptive-value('max-width', 32, 24);
    }

    @media (any-hover: hover) {
      &:hover {
        color: var(--color-accent);
      }
    }
  }
}

@keyframes modal-show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modal-hide {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes backdrop-show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes backdrop-hide {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes content-show {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes content-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0);
  }
}

.modal-form {
  display: grid;
  gap: rem(30);

  @include adaptive-value('gap', 30, 20);

  &__header {
    display: grid;
    gap: rem(5);
  }

  &__title {
    line-height: 125%;

    @include adaptive-value('font-size', 38, 28);
  }

  &__description {
    font-size: rem(16);
    line-height: 140%;
  }

  &__footer {
    display: grid;
    gap: rem(10);
  }
}
</style>
