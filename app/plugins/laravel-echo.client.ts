import type { ChannelAuthorizationCallback } from 'pusher-js'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Echo: Echo<any>
    Pusher: typeof Pusher
  }
}

export default defineNuxtPlugin((_nuxtApp) => {
  window.Pusher = Pusher

  const config = useRuntimeConfig()

  const client = useSanctumClient()

  const echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST,
    wsPort: Number(config.public.REVERB_PORT) ?? 80,
    wssPort: Number(config.public.REVERB_PORT) ?? 443,
    forceTLS: (config.public.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],

    authorizer: (channel: any) => {
      return {
        authorize: (socketId: string, callback: ChannelAuthorizationCallback) => {
          client('broadcasting/auth', {
            method: 'post',
            body: {
              socket_id: socketId,
              channel_name: channel.name,
            },
          })
            .then((response: any) => callback(null, response))
            .catch((error: Error) => callback(error, null))
        },
      }
    },
  })

  return {
    provide: { echo },
  }
})
