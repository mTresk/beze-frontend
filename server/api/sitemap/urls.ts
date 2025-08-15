import type { CategoriesRoute, ProductsRoute, SubcategoriesRoute } from '../../types'

export default defineSitemapEventHandler(async () => {
  const products = await $fetch<ProductsRoute[]>(`${useRuntimeConfig().public.backendUrl}/api/products/routes`)
  const categories = await $fetch<CategoriesRoute[]>(`${useRuntimeConfig().public.backendUrl}/api/categories/routes`)
  const subcategories = await $fetch<SubcategoriesRoute[]>(`${useRuntimeConfig().public.backendUrl}/api/categories/routes/subcategories`)

  return [
    ...products.map(page =>
      asSitemapUrl({
        loc: `/catalog/${page.slug}`,
        lastmod: page.updatedAt,
        images: page.images.map(image => ({
          loc: image.retina,
          title: page.name,
          caption: page.name,
        })),
      }),
    ),
    ...categories.map(page =>
      asSitemapUrl({
        loc: `/catalog/category/${page.slug}`,
        lastmod: page.updatedAt,
        images: [
          {
            loc: page.image.retina,
            title: page.name,
            caption: page.name,
          },
        ],
      }),
    ),
    ...subcategories.map(page =>
      asSitemapUrl({
        loc: `/catalog/category/${page.category.slug}/${page.slug}`,
        lastmod: page.updatedAt,
      }),
    ),
  ]
})
