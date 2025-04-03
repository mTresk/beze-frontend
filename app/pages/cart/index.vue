<script setup lang="ts">
import type { ICartProduct, IColor, IOrder, IProduct, ISize } from '@/types/api'

definePageMeta({
    pageTransition: {
        name: 'layout',
        mode: 'out-in',
    },
})

const { cartItems, clearCartItems } = useCart()

const products = ref<IProduct[]>()

const colors = ref<IColor[]>()

const sizes = ref<ISize[]>()

const isLoading = ref(false)

const isDataLoaded = ref(false)

const cartTotal = ref()

const productsIds = computed(() => {
    return cartItems.value.map(item => item.productId)
})

const form = ref<IOrder>()

async function fetchProducts() {
    products.value = await useFetcher<IProduct[]>(`/api/products/selected?ids=${productsIds.value}`)
}

async function fetchColors() {
    colors.value = await useFetcher<IColor[]>(`/api/colors`)
}

async function fetcSizes() {
    sizes.value = await useFetcher<ISize[]>(`/api/sizes`)
}

async function fetchAllData() {
    isLoading.value = true
    await Promise.all([fetchProducts(), fetchColors(), fetcSizes()])
    isLoading.value = false
    checkDataLoaded()
}

function checkDataLoaded() {
    if (products.value && colors.value && sizes.value) {
        isDataLoaded.value = true
        calculateTotal()
    }
}

const productCartItems = computed(() => {
    if (!products.value)
        return []

    return cartItems.value.map((item) => {
        const product = products.value?.find(product => product.id === Number(item.productId))

        if (!product)
            return null

        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            sku: product.sku,
            price: product.price,
            images: product.images,
            color: product.colors.filter(color => color.id === Number(item.colorId))[0],
            size: product.sizes.filter(size => size.id === Number(item.sizeId))[0],
            quantity: item.qty,
        }
    })
})

async function calculateTotal() {
    if (!isDataLoaded.value)
        return

    let total = 0

    productCartItems.value.forEach((item) => {
        if (item) {
            const price = Number.parseFloat(item.price.replace(/\s+/g, ''))
            const quantity = Number(item.quantity)
            total += price * quantity
        }
    })

    cartTotal.value = total
}

async function submitOrder() {
    const products = productCartItems.value.map((item) => {
        return {
            id: item?.id,
            quantity: item?.quantity,
        }
    })

    const payload = {
        products,
        ...form.value,
        communication: form.value?.communication?.name,
    }

    await useFetcher('/api/order', {
        body: payload,
        method: 'post',
    })
}

const {
    submit: handleSubmit,
    validationErrors: errors,
    isLoading: isFormSending,
} = useSubmit(
    () => {
        return submitOrder()
    },
    {
        onSuccess: () => {
            clearCartItems()
            navigateTo('/order', { replace: true })
        },
    },
)

watch(
    () => productCartItems.value.map(item => item?.quantity),
    () => {
        if (isDataLoaded.value) {
            calculateTotal()
        }
    },
)

onMounted(() => {
    fetchAllData()
})
</script>

<template>
    <div>
        <section class="cart">
            <div class="cart__container">
                <ul class="breadcrumb">
                    <li>
                        <NuxtLink to="/">
                            Главная
                        </NuxtLink>
                    </li>
                    <li><span>Корзина</span></li>
                </ul>
                <UiPageTitle>Корзина</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-if="productCartItems.length" class="cart__body">
                    <div class="cart__wrapper">
                        <div class="cart__table">
                            <CartItem v-for="product in productCartItems" :key="product?.id" :product="product as ICartProduct" />
                        </div>
                        <div class="cart__form">
                            <UiSpinner v-if="isFormSending" />
                            <CartForm v-model="form" :errors="errors" />
                        </div>
                    </div>
                    <div class="cart__checkout">
                        <div class="cart__links">
                            <UiLink href="#">
                                Условия оплаты и доставки
                            </UiLink>
                            <UiLink href="#">
                                Условия возврата и обмена
                            </UiLink>
                        </div>
                        <div class="cart__caution">
                            <span>!</span>
                            Оплата производится после уточнения менеджером деталей заказа
                        </div>
                        <div class="cart__total">
                            <div class="cart__line">
                                <div class="cart__key">
                                    Доставка
                                </div>
                                <div class="cart__value">
                                    0 ₽
                                </div>
                            </div>
                            <div class="cart__line">
                                <div class="cart__key">
                                    Итого
                                </div>
                                <div class="cart__value cart__value--lg">
                                    {{ cartTotal }} ₽
                                </div>
                            </div>
                        </div>
                        <div class="cart__footer">
                            <UiButton :disabled="isFormSending" class="cart__button" @click="handleSubmit">
                                Сделать заказ
                            </UiButton>
                            <p class="cart__policy">
                                Нажимая на кнопку «сделать заказ», я принимаю условия <a href="#">публичной оферты</a> и <a href="#">политики конфиденциальности</a>
                            </p>
                        </div>
                    </div>
                </div>
                <p v-else class="favorites__empty">
                    Ваша корзина пока пуста
                </p>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.cart {
	padding-top: rem(130);
	padding-bottom: rem(160);

	// .cart__body
	&__body {
        position: relative;
		display: flex;
		gap: rem(60);
		align-items: flex-start;
		justify-content: space-between;
	}

	// .cart__wrapper
	&__wrapper {
		flex: 0 1 rem(1000);
	}

	// .cart__table
	&__table {
		display: grid;
		gap: rem(40);
		padding-bottom: rem(40);
		margin-bottom: rem(40);
		border-bottom: 1px solid rgb(54 54 54 / 10%);
	}

	// .cart__form
	&__form {
        position: relative;
        max-width: rem(330);
	}

	// .cart__checkout
	&__checkout {
		position: sticky;
		top: rem(100);
        display: grid;
		flex: 0 1 rem(340);
        gap: rem(20);
	}

	// .cart__links
	&__links {
        display: grid;
        gap: rem(16);
	}

	// .cart__link
	&__link {
        font-size: 16px;
        line-height: 130%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
	}

	// .cart__caution
	&__caution {
        display: flex;
        gap: rem(8);
        align-items: flex-start;
        padding: rem(14) rem(16);
        font-size: 13px;
        line-height: 130%;
        background-color: $lightColor;
        border-radius: rem(4);

        span {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: rem(16);
            height: rem(16);
            font-size: rem(12);
            line-height: 130%;
            color: $whiteColor;
            background-color: $accentColor;
            border-radius: 50%;
        }
	}

	// .cart__total
	&__total {
        display: grid;
        gap: rem(10);
	}

	// .cart__line
	&__line {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
	}

	// .cart__key
	&__key {
        font-size: 16px;
        line-height: 140%;
        text-transform: uppercase;
	}

	// .cart__value
	&__value {
        font-size: 16px;
        line-height: 140%;
        text-align: right;

		// .cart__value--lg
		&--lg {
            font-size: 28px;
            font-weight: 500;
		}
	}

	// .cart__footer
	&__footer {
        display: grid;
        gap: rem(10);
	}

    // .cart__button
	&__button {
        width: 100%;
	}

	// .cart__policy
	&__policy {
        font-size: 14px;
        line-height: 140%;

        a {
            text-decoration: underline;
            text-decoration-thickness: 10%;
            text-decoration-style: dotted;
            transition: color 0.3s ease-in-out;

            @media (any-hover: hover){
                &:hover{
                    color: $accentColor;
                }
            }
        }
	}
}
</style>
