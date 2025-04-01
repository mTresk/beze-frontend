<template>
    <div class="wrapper">
        <LayoutHeader />
        <main class="page">
            <LayoutSmoothScroll>
                <slot />
            </LayoutSmoothScroll>
        </main>
    </div>
    <UiCursor />
</template>
