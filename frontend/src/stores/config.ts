import { RefreshInterval } from '@/config/enums'
import { createStore } from 'solid-js/store'

const [config, setConfig] = createStore<{
    refreshInterval: RefreshInterval
}>({
    refreshInterval:
        (Object.values(RefreshInterval).find(
            (r) => r.toString() === localStorage.getItem('refreshInterval')
        ) as RefreshInterval) ?? RefreshInterval.FIVE_SECONDS,
})

export { config, setConfig }
