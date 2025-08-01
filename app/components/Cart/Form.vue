<script setup lang="ts">
import type { IOrder, ISettings, IUser, ValidationErrors } from '@/types/api'
import { CartDeliveryPickup, CartDeliveryRussia, CartDeliveryTyumen } from '#components'

defineProps<{
    errors: ValidationErrors
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: typeof form | null): void
}>()

const user: Ref<IUser | null> = useSanctumUser()

const settings = useState<ISettings>('settings')

const options = [
    { id: 1, name: 'Телефон' },
    { id: 2, name: 'Email' },
    { id: 3, name: 'Telegram' },
    { id: 4, name: 'WhatsApp' },
]

const deliveryTabs = [
    { id: 'pickup', label: 'Самовывоз' },
    { id: 'tyumen', label: 'Доставка по Тюмени' },
    { id: 'russia', label: 'Доставка по России' },
] as const

type DeliveryTab = typeof deliveryTabs[number]['id']

const currentDeliveryTab = ref<DeliveryTab>('pickup')

const pickupAddress = settings.value.address

const deliveryCost = ref<number>(0)

const tyumenAddress = ref('')

const form = reactive<Partial<IOrder>>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    communication: undefined,
    address: '',
    delivery_cost: deliveryCost.value,
    delivery_type: deliveryTabs[0]?.id as IOrder['delivery_type'],
})

const deliveryComponent = computed(() => {
    if (currentDeliveryTab.value === 'pickup') {
        return CartDeliveryPickup
    }

    if (currentDeliveryTab.value === 'tyumen') {
        return CartDeliveryTyumen
    }

    return CartDeliveryRussia
})

function populateFormWithUserData() {
    if (!user.value) {
        return
    }

    form.name = user.value.name || ''
    form.surname = user.value.surname || ''

    if (user.value.email) {
        form.email = user.value.email
    }

    if (user.value.profile) {
        form.phone = user.value.profile.phone || ''
        form.address = user.value.profile.address || ''

        if (user.value.profile.deliveryType === 'tyumen' && user.value.profile.address) {
            tyumenAddress.value = user.value.profile.address
        }

        if (user.value.profile.deliveryType) {
            const validDeliveryType = deliveryTabs.some(tab => tab.id === user.value?.profile?.deliveryType)
            if (validDeliveryType) {
                currentDeliveryTab.value = user.value.profile.deliveryType as DeliveryTab
                form.delivery_type = user.value.profile.deliveryType
            }
        }

        if (user.value.profile.communication) {
            const communicationOption = options.find(
                option => option.name.toLowerCase() === user.value?.profile?.communication?.toLowerCase(),
            )

            if (communicationOption) {
                form.communication = communicationOption
            }
        }
    }

    emit('update:modelValue', form)
}

function handleDeliveryCost(cost: number) {
    deliveryCost.value = cost
    form.delivery_cost = cost
    emit('update:modelValue', form)
}

watch(() => form.address, (newAddress) => {
    if (currentDeliveryTab.value === 'tyumen' && newAddress !== undefined) {
        tyumenAddress.value = newAddress
    }
})

watch(currentDeliveryTab, (newTab) => {
    form.delivery_type = newTab
    deliveryCost.value = 0
    form.delivery_cost = 0

    if (newTab === 'russia') {
        form.address = ''
    }
    else if (newTab === 'tyumen') {
        form.address = tyumenAddress.value
    }

    emit('update:modelValue', form)
}, { immediate: true })

watch(user, () => {
    populateFormWithUserData()
}, { immediate: true })

watch(form, (newForm) => {
    emit('update:modelValue', newForm)
}, { deep: true })
</script>

<template>
    <VForm>
        <VFormGroup>
            <template #label>
                Личные данные
            </template>
            <template #body>
                <VFormBlock :error="errors.name">
                    <VFormField>
                        <VFormLabel for="name">
                            Имя*
                        </VFormLabel>
                        <VFormInput
                            id="name"
                            v-model="form.name"
                            :error="errors.name"
                            type="text"
                            placeholder="Введите имя"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.surname">
                    <VFormField>
                        <VFormLabel for="surname">
                            Фамилия*
                        </VFormLabel>
                        <VFormInput
                            id="surname"
                            v-model="form.surname"
                            :error="errors.surname"
                            type="text"
                            placeholder="Введите фамилию"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.email">
                    <VFormField>
                        <VFormLabel for="email">
                            Email*
                        </VFormLabel>
                        <VFormInput
                            id="email"
                            v-model="form.email"
                            :error="errors.email"
                            type="email"
                            placeholder="Введите email"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.phone">
                    <VFormField>
                        <VFormLabel for="phone">
                            Телефон *
                        </VFormLabel>
                        <VFormInput
                            id="phone"
                            v-model="form.phone"
                            maska="+7 (###) ### ## ##"
                            :error="errors.phone"
                            type="tel"
                            placeholder="Введите телефон"
                        />
                    </VFormField>
                </VFormBlock>
                <VFormBlock :error="errors.communication">
                    <VFormField>
                        <VFormLabel for="communication">
                            Как с вами связаться?
                        </VFormLabel>
                        <VFormSelect
                            id="communication"
                            v-model="form.communication"
                            :error="errors.address"
                            placeholder="Способ связи"
                            :options="options"
                        />
                    </VFormField>
                </VFormBlock>
            </template>
        </VFormGroup>
        <VFormGroup block>
            <template #label>
                Доставка
            </template>
            <template #body>
                <div class="tabs">
                    <VFormOption
                        v-for="tab in deliveryTabs"
                        :key="tab.id"
                        v-model="currentDeliveryTab"
                        :value="tab.id"
                        :label="tab.label"
                        name="delivery"
                        :class="[{ active: currentDeliveryTab === tab.id }]"
                    />
                </div>
                <component
                    :is="deliveryComponent"
                    v-model:address="form.address"
                    :pickup-address="pickupAddress"
                    :error="errors.address"
                    @delivery-cost="handleDeliveryCost"
                />
            </template>
        </VFormGroup>
    </VForm>
</template>

<style lang="scss" scoped>
.tabs {
    display: flex;
    gap: rem(16);
    align-items: center;
    margin-bottom: rem(20);

    @media (max-width: $mobile) {
        display: grid;
    }
}
</style>
