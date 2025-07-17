<script setup lang="ts">
defineProps<{
    error?: string[]
}>()
</script>

<template>
    <div class="form-block">
        <slot />
        <small
            v-if="error"
            class="form-error"
        >{{ error[0] }}</small>
    </div>
</template>

<style lang="scss" scoped>
.form-block {
    position: relative;
}

.form-error {
    position: absolute;
    color: $redColor;

    @include adaptive-value('font-size', 12, 10);
    @include adaptive-value('bottom', -15, -12);
}
</style>
