declare module 'vue-dadata-3' {
    import type { DefineComponent } from 'vue'

    export interface DaDataResult<T> {
        value: string
        unrestricted_value: string
        data: T
    }

    export interface DaDataAddress {
        // Базовые поля для работы компонента
        city: string | null
        region: string | null
        country: string | null
        // Другие поля опущены для краткости
    }

    export type DaDataBank = any
    export type DaDataParty = any
    export type DaDataFio = any

    export type DaDataSuggestionAnyType =
        DaDataResult<DaDataAddress> |
        DaDataResult<DaDataBank> |
        DaDataResult<DaDataParty> |
        DaDataResult<DaDataFio>

    export interface DaDataSuggestions {
        suggestions: DaDataSuggestionAnyType[]
    }

    export type DaDataDivisions = 'administrative' | 'municipal'

    export interface DaDataLocationRestriction {
        country_iso_code?: string
        region_iso_code?: string
        kladr_id?: string | number
        fias_id?: string
        country?: string
        region?: string
        area?: string
        city?: string
        settlement?: string
        street?: string
    }

    export interface DaDataLocationGeoRestriction {
        lat: number
        lon: number
        radius_meters?: number
    }

    export interface DaDataLocationBoostRestriction {
        kladr_id: string | number
    }

    export interface LocationOptions {
        division?: DaDataDivisions
        locations?: Array<DaDataLocationRestriction>
        locations_geo?: Array<DaDataLocationGeoRestriction>
        locations_boost?: Array<DaDataLocationBoostRestriction>
    }

    export const DaDataNext: DefineComponent<{
        modelValue?: string | number
        token: string
        placeholder?: string
        inputId?: string
        locations?: LocationOptions
    }>
}
