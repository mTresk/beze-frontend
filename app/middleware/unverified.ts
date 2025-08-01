import type { IUser } from '@/types/api'

export default defineNuxtRouteMiddleware(() => {
    const user = useSanctumUser<IUser>()
    const { isAuthenticated } = useSanctumAuth()

    if (!isAuthenticated.value) {
        return navigateTo('/auth/login')
    }

    if (user.value?.verified) {
        return navigateTo('/personal')
    }
})
