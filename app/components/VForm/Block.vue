<script setup lang="ts">
defineProps<{
    error?: string[]
}>()
</script>

<template>
    <div class="form-block">
        <slot />
        <small v-if="error" class="form-error">{{ error[0] }}</small>
    </div>
</template>

<style lang="scss" scoped>
.form-block {
    position: relative;
}

.form-error {
    position: absolute;
    bottom: rem(-15);
    font-size: rem(12);
    color: $redColor;
}
</style>
