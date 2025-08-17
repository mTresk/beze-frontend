<template>
  <div class="loader">
    <div class="loader__inner" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);

  &__inner {
    z-index: 10;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    aspect-ratio: 1;
    padding: 0;
    font-size: rem(20);
    color: var(--color-accent);
    text-indent: -9999em;
    border-radius: 50%;
    animation: load 1.3s infinite linear 0.1s;
  }
}

@keyframes load {
  0%,
  100% {
    box-shadow:
      0 -3em 0 0.2em,
      2em -2em 0 0,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 0;
  }

  12.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 0.2em,
      3em 0 0 0,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  25% {
    box-shadow:
      0 -3em 0 -0.5em,
      2em -2em 0 0,
      3em 0 0 0.2em,
      2em 2em 0 0,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 0,
      2em 2em 0 0.2em,
      0 3em 0 0,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  50% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 0,
      0 3em 0 0.2em,
      -2em 2em 0 0,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 0,
      -2em 2em 0 0.2em,
      -3em 0 0 0,
      -2em -2em 0 -1em;
  }

  75% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0 0 0.2em,
      -2em -2em 0 0;
  }

  87.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0 0 0,
      -2em -2em 0 0.2em;
  }
}

@keyframes load4 {
  0%,
  100% {
    box-shadow:
      0 -3em 0 0.2em,
      2em -2em 0 0,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 0;
  }

  12.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 0.2em,
      3em 0 0 0,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  25% {
    box-shadow:
      0 -3em 0 -0.5em,
      2em -2em 0 0,
      3em 0 0 0.2em,
      2em 2em 0 0,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 0,
      2em 2em 0 0.2em,
      0 3em 0 0,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  50% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 0,
      0 3em 0 0.2em,
      -2em 2em 0 0,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 0,
      -2em 2em 0 0.2em,
      -3em 0 0 0,
      -2em -2em 0 -1em;
  }

  75% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0 0 0.2em,
      -2em -2em 0 0;
  }

  87.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0 0 0,
      -2em -2em 0 0.2em;
  }
}
</style>
