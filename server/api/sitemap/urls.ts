import type { PageRoute } from '../../types'

export default defineSitemapEventHandler(async () => {
    const pages = await $fetch<PageRoute[]>(`${useRuntimeConfig().public.backendUrl}/api/products/routes`)
    return [
        ...pages.map(page =>
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
    ]
})
