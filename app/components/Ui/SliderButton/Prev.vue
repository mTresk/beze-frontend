<template>
    <button
        aria-label="Назад"
        type="button"
        class="slider-button slider-button--prev"
    >
        <svg width="40" height="40">
            <use href="/images/icons.svg#arrow-left" />
        </svg>
    </button>
</template>

<style lang="scss">
.slider-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: rem(60);
	height: rem(60);
	color: $whiteColor;
	background-color: $extraColor;
	border-radius: rem(4);
	transition: all 0.3s ease-in-out;

	@media (any-hover: hover) {
		&:hover {
			background-color: $accentColor;
		}
	}

	&.swiper-button-disabled {
		visibility: hidden;
		opacity: 1;
	}
}
</style>
