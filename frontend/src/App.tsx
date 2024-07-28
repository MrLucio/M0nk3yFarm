import type { Component } from 'solid-js'
import { Toaster } from '@/components/ui/sonner'
import Navigation from './components/navigation'
import { ColorModeProvider } from '@kobalte/core/color-mode'

const App: Component = () => {
    return (
        <>
            <Toaster richColors closeButton position="bottom-center" />
            <ColorModeProvider>
                <Navigation />
            </ColorModeProvider>
        </>
    )
}

export default App
