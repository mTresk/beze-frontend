<script setup lang="ts">
import type { IOrder, ISettings, IUser, ValidationErrors } from '@/types/api'
import { CartDeliveryPickup, CartDeliveryRussia, CartDeliveryTyumen } from '#components'

interface IProps {
  errors: ValidationErrors
}

type DeliveryTab = typeof deliveryTabs[number]['id']

defineProps<IProps>()

const form = defineModel<Partial<IOrder>>({ required: true })

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

const user: Ref<IUser | null> = useSanctumUser()
const settings = useState<ISettings>('settings')

const currentDeliveryTab = ref<DeliveryTab>('pickup')
const pickupAddress = settings.value.address
const deliveryCost = ref(0)
const tyumenAddress = ref('')

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

  form.value.name = user.value.name || ''
  form.value.surname = user.value.surname || ''

  if (user.value.email) {
    form.value.email = user.value.email
  }

  if (user.value.profile) {
    form.value.phone = user.value.profile.phone || ''
    form.value.address = user.value.profile.address || ''

    if (user.value.profile.deliveryType === 'tyumen' && user.value.profile.address) {
      tyumenAddress.value = user.value.profile.address
    }

    if (user.value.profile.deliveryType) {
      const validDeliveryType = deliveryTabs.some(tab => tab.id === user.value?.profile?.deliveryType)

      if (validDeliveryType) {
        currentDeliveryTab.value = user.value.profile.deliveryType as DeliveryTab
        form.value.delivery_type = user.value.profile.deliveryType
      }
    }

    if (user.value.profile.communication) {
      const communicationOption = options.find(
        option => option.name.toLowerCase() === user.value?.profile?.communication?.toLowerCase(),
      )

      if (communicationOption) {
        form.value.communication = communicationOption
      }
    }
  }
}

function handleDeliveryCost(cost: number) {
  deliveryCost.value = cost
  form.value.delivery_cost = cost
}

watch(() => form.value.address, (newAddress) => {
  if (currentDeliveryTab.value === 'tyumen' && newAddress !== undefined) {
    tyumenAddress.value = newAddress
  }
})

watch(currentDeliveryTab, (newTab) => {
  form.value.delivery_type = newTab
  deliveryCost.value = 0
  form.value.delivery_cost = 0

  if (newTab === 'russia') {
    form.value.address = ''
  }
  else if (newTab === 'tyumen') {
    form.value.address = tyumenAddress.value
  }
}, { immediate: true })

watch(user, () => {
  populateFormWithUserData()
}, { immediate: true })
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
              Почта*
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
