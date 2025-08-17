<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/sizes`)

const {
  data: sizesTable,
  suspense,
} = useQuery({
  queryKey: ['sizes-table'],
  queryFn: fetcher,
})

await suspense()
const ctx = ref()

const isCompositionModalOpen = ref(false)

const isCareModalOpen = ref(false)

const isSizesModalOpen = ref(false)

onMounted(() => {
  const mm = gsap.matchMedia()

  mm.add('(min-width: 1100px)', () => {
    setTimeout(() => {
      ctx.value = gsap.context(() => {
        gsap.from('.customers-card', {
          duration: 2,
          y: 300,
          ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
          stagger: 0.5,
          scrollTrigger: {
            trigger: '.customers__body',
            scrub: true,
            start: '0% 100%',
            end: 'bottom 50%',
          },
        })
      })
    }, 100)
  })
})

onBeforeUnmount(() => {
  if (ctx.value) {
    ctx.value.revert()
  }
})
</script>

<template>
  <section class="customers spacer">
    <div class="customers__container">
      <UiTitle class="customers__title">
        Покупателям
      </UiTitle>
    </div>
    <div class="customers__wrapper">
      <div class="customers__background">
        <video
          class="customers__video"
          autoplay
          muted
          loop
          playsinline
          src="~/assets/video/textile.mp4"
        />
      </div>
      <div class="customers__container">
        <div class="customers__body">
          <article class="customers-card">
            <div class="customers-card__content">
              <h3 class="customers-card__title">
                Состав наших изделий
              </h3>
              <p class="customers-card__text">
                Для производства изделий мы используем шёлк Армани – он состоит из 97% полиэстера и 3% эластана, но это не мешает ткани быть легкой, нежной и приятной на ощупь.
              </p>
            </div>
            <UiLink
              medium
              @click="isCompositionModalOpen = true"
            >
              Подробнее о составе
            </UiLink>
          </article>
          <article class="customers-card">
            <div class="customers-card__content">
              <h3 class="customers-card__title">
                Уход за шёлком
              </h3>
              <p class="customers-card__text">
                Наши изделия требуют не слишком сложного, но тем не менее бережного ухода.
              </p>
            </div>
            <UiLink
              medium
              @click="isCareModalOpen = true"
            >
              Рекомендации по уходу
            </UiLink>
          </article>
          <article class="customers-card">
            <div class="customers-card__content">
              <h3 class="customers-card__title">
                Размерный ряд
              </h3>
              <p class="customers-card__text">
                Мы отшиваем изделия от 40 до 60 размера. Вы можете ознакомиться с размерной сеткой ниже.
              </p>
            </div>
            <UiLink
              medium
              @click="isSizesModalOpen = true"
            >
              Размерная сетка
            </UiLink>
          </article>
        </div>
      </div>
    </div>

    <!-- Модальное окно с составом -->
    <LayoutDialog v-model="isCompositionModalOpen">
      <div class="content">
        <h2>
          Атлас «Армани»
        </h2>
        <ul>
          <li>Тонкая гладкая ткань с гладкокрашенной отделкой;</li>
          <li>Поверхность полотна ровная, плотная, с матовым блеском;</li>
          <li>Материал эластичный, при драпировке образует мягкие струящиеся складки;</li>
        </ul>
        <p>Вещи из шёлковой ткани настоящий подарок для тела!</p>
        <p>
          Состав: 97% п/э, 3% спандекс
          <br>
          Плотность: 144 гр/м. пог
          <br>
          Без узора
        </p>
      </div>
    </LayoutDialog>

    <!-- Модальное окно с уходом -->
    <LayoutDialog v-model="isCareModalOpen">
      <div class="content">
        <h2>
          Рекомендации по уходу за шёлком
        </h2>
        <ul>
          <li>Стирайте изделия вручную или на деликатном режиме в растворе нейтральных моющих средств (гель подойдёт идеально) и в воде не выше 30 градусов;</li>
          <li>Пожалуйста, без резких движений! Не трите отдельные участки изделия, не выкручивайте и не оставляйте в воде слишком долго;</li>
          <li>После стирки изделие следует прополоскать в тёплой, а затем в холодной воде. Никаких скручиваний и отчаянных выжиманий;</li>
          <li>После нехитрых манипуляций встряхиваем изделие и оставляем сушиться на плечиках, оставив нагревательные приборы подальше;</li>
          <li>Гладить изделие при необходимости через увлажненную хлопчатобумажную ткань на деликатном режиме.</li>
        </ul>
      </div>
    </LayoutDialog>

    <!-- Модальное окно с размерами -->
    <LayoutDialog v-model="isSizesModalOpen">
      <div class="content">
        <h2>{{ sizesTable?.data.name }}</h2>
        <div v-html="sizesTable?.data.content" />
      </div>
    </LayoutDialog>
  </section>
</template>

<style lang="scss">
.customers {
  &__container {
    @media (max-width: em(1100)) {
      padding: 0 !important;
    }
  }

  // .customers__wrapper
  &__wrapper {
    position: relative;

    @include adaptive-value('padding-block', 100, 60);
  }

  &__background {
    position: absolute;
    inset: 0;

    &::before {
      position: absolute;
      inset: 0;
      z-index: 1;
      content: '';
      background-color: var(--color-accent);
      opacity: 0.7;
    }
  }

  &__video {
    filter: grayscale(1);

    @include image;
  }

  &__title {
    position: relative;
    z-index: 5;

    @include adaptive-value('margin-bottom', 40, 18);

    @media (max-width: em(1100)) {
      @include adaptive-value('padding-inline', 40, 20);
    }
  }

  &__body {
    position: relative;
    z-index: 5;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;

    @include adaptive-value('gap', 120, 10, 0, 1920, 992);

    @media (max-width: em(1100)) {
      display: flex;
      align-items: center;
      overflow-x: auto;

      @include adaptive-value('padding-inline', 40, 20);
      @include hide-scroll;
    }
  }
}

.customers-card {
  display: flex;
  flex-direction: column;
  gap: rem(16);
  align-items: start;
  justify-content: space-between;
  aspect-ratio: 100 / 100;
  padding: rem(50) rem(30) rem(40);
  background: rgb(255 255 255 / 35%);
  border: rem(1) solid rgb(255 255 255 / 50%);
  backdrop-filter: blur(rem(9));

  @include adaptive-value('max-width', 400, 300);
  @include adaptive-value('padding-top', 50, 30);
  @include adaptive-value('padding-bottom', 40, 30);
  @include adaptive-value('padding-inline', 30, 20);

  @media (max-width: em(1100)) {
    flex: 0 0 rem(300);
  }

  &__content {
    display: grid;
    gap: rem(16);
  }

  &__title {
    font-family: 'Quincy CF', sans-serif;
    line-height: 120%;
    letter-spacing: 0.01em;

    @include adaptive-value('font-size', 24, 20);
  }

  &__text {
    line-height: 140%;

    @include adaptive-value('font-size', 18, 14);
  }
}
</style>
