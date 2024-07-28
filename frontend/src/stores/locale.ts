import { createStore } from 'solid-js/store'
import { Locale } from '@/config/enums'

const [locale, setLocale] = createStore<{ locale: Locale }>({
    locale: localStorage.getItem('locale') as Locale,
})

export { locale, setLocale }
