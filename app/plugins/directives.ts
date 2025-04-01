import type { DirectiveBinding } from 'vue'

interface RippleBinding extends Omit<DirectiveBinding, 'value'> {
    value?: number
}

function handleRipple(element: HTMLElement, binding: RippleBinding, event: MouseEvent) {
    const rippleElement = document.createElement('span')
    let currentDiameter = 1
    let currentOpacity = 0.65
    const animationHandler = setInterval(animateRippleSpread, 5)
    applyRippleStyle()

    function applyRippleStyle() {
        const elementCoordinates = element.getBoundingClientRect()
        const offsetY = event.clientY - elementCoordinates.y
        const offsetX = event.clientX - elementCoordinates.x

        rippleElement.style.position = 'absolute'
        rippleElement.style.height = '5px'
        rippleElement.style.width = '5px'
        rippleElement.style.borderRadius = '100%'
        rippleElement.style.backgroundColor = '#f2f2f2'
        rippleElement.style.left = `${offsetX}px`
        rippleElement.style.top = `${offsetY}px`

        if (event.target instanceof HTMLElement) {
            event.target.appendChild(rippleElement)
        }
    }

    function animateRippleSpread() {
        const maximalDiameter = binding.value || 50
        if (currentDiameter <= maximalDiameter) {
            currentDiameter++
            currentOpacity -= 0.65 / maximalDiameter
            rippleElement.style.transform = `scale(${currentDiameter})`
            rippleElement.style.opacity = `${currentOpacity}`
        }
        else {
            rippleElement.remove()
            clearInterval(animationHandler)
        }
    }
}

interface ExtendedHTMLElement extends HTMLElement {
    clickOutsideEvent?: (event: MouseEvent) => void
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('ripple', {
        mounted: (element: HTMLElement, binding: RippleBinding) => {
            element.style.position = 'relative'
            element.style.overflow = 'hidden'
            element.addEventListener('click', (ev: MouseEvent) => handleRipple(element, binding, ev))
        },
    })

    nuxtApp.vueApp.directive('clickOutside', {
        mounted: (element: ExtendedHTMLElement, binding: DirectiveBinding) => {
            element.clickOutsideEvent = (event: MouseEvent) => {
                if (event.target instanceof Node && !(element === event.target || element.contains(event.target))) {
                    binding.value(event, element)
                }
            }
            document.addEventListener('click', element.clickOutsideEvent)
        },
        unmounted: (element: ExtendedHTMLElement) => {
            if (element.clickOutsideEvent) {
                document.removeEventListener('click', element.clickOutsideEvent)
            }
        },
    })
})
