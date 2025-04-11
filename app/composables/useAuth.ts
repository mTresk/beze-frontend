import type { ICompleteRegistrationCredentials, IRegisterCredentials, IResetPasswordCredentials } from '@/types/api'

export function useAuth() {
    const client = useSanctumClient()
    const { refreshIdentity } = useSanctumAuth()

    async function register(credentials: IRegisterCredentials) {
        await client('/register', { method: 'post', body: credentials })
        await refreshIdentity()
    }

    async function completeRegistration(credentials: ICompleteRegistrationCredentials) {
        const response = await client<{ status: string }>('/complete-registration', { method: 'post', body: credentials })
        await refreshIdentity()
        return response
    }

    async function resendEmailVerification() {
        return await client<{ status: string }>('/email/verification-notification', {
            method: 'post',
        })
    }

    async function forgotPassword(email: string) {
        return await client<{ status: string }>('/forgot-password', {
            method: 'post',
            body: { email },
        })
    }

    async function resetPassword(credentials: IResetPasswordCredentials) {
        return await client<{ status: string }>('/reset-password', {
            method: 'post',
            body: credentials,
        })
    }

    return {
        resendEmailVerification,
        forgotPassword,
        resetPassword,
        register,
        completeRegistration,
    }
}
