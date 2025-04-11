declare module 'vue-dadata-3' {
    import type { DefineComponent } from 'vue'

    export interface DaDataSuggestionAnyType {
        value: string
        unrestricted_value: string
        data: any
    }

    export const DaDataNext: DefineComponent<{
        modelValue?: string | number
        token: string
        placeholder?: string
        inputId?: string
    }>
}
