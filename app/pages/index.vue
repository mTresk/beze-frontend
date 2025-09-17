<template>
  <div>
    <Hero />
    <Advantages />
    <LazyDirections :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyBestsellers :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyCollections :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyAbout :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyGallery :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyReviews :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyCustomers :hydrate-on-visible="{ rootMargin: '20%' }" />
    <LazyCertificate :hydrate-on-visible="{ rootMargin: '20%' }" />
    <UiCursor />
  </div>
</template>
