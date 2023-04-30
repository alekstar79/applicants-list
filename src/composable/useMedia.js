import { MediaTracker } from '@/utils/matchmedia'
import { MIN_WIDTH } from './constants'

import { useStore, SET_SCREEN_MODE } from '@/store'
import { computed } from 'vue'

export function useMedia(width = MIN_WIDTH)
{
  const store = useStore()

  const media = new MediaTracker(width)
  const isMobile = computed({
    set(isMobile)
    {
      store.commit(SET_SCREEN_MODE, isMobile)
    },
    get()
    {
      return store.getters.isMobile
    }
  })

  const mediaScreen = match => isMobile.value = match

  mediaScreen(media.maxWidth.matches)

  media.setHandler(mediaScreen)

  return {
    mediaScreen,
    isMobile,
    media
  }
}
