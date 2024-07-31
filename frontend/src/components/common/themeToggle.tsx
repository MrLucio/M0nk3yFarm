import { useColorMode } from '@kobalte/core/color-mode'
import { Component } from 'solid-js'
import Sun from 'lucide-solid/icons/sun'
import Moon from 'lucide-solid/icons/moon'
import { Button } from '@/components/ui/button'

const ThemeToggle: Component = () => {
    // Hooks
    const { colorMode, toggleColorMode } = useColorMode()

    // Render
    return (
        <Button variant="ghost" size="sm" onClick={() => toggleColorMode()}>
            {colorMode() === 'light' ? <Sun size="20" /> : <Moon size="20" />}
        </Button>
    )
}

export default ThemeToggle
