import { Component, createEffect, createMemo } from 'solid-js'
import { auth } from '@/stores/auth'
import AuthenticatedView from '@/views/authenticated'
import UnauthenticatedView from '@/views/unauthenticated'
import { trackStore } from '@solid-primitives/deep'
import { locale } from '@/stores/locale'
import { config } from '@/stores/config'
import { RefreshInterval } from '@/config/enums'

const Navigation: Component = () => {
    // Memos
    const render = createMemo(() => {
        if (auth.username && auth.password) return <AuthenticatedView />
        return <UnauthenticatedView />
    })

    // Effects
    createEffect(() => {
        trackStore(auth)
        localStorage.setItem('username', auth.username ?? '')
        localStorage.setItem('password', auth.password ?? '')
    })

    createEffect(() => {
        trackStore(locale)
        localStorage.setItem('locale', locale.locale ?? '')
    })

    createEffect(() => {
        trackStore(config)
        localStorage.setItem(
            'refreshInterval',
            config.refreshInterval.toString() ??
                RefreshInterval.FIVE_SECONDS.toString()
        )
    })

    // Render
    return <>{render()}</>
}

export default Navigation
