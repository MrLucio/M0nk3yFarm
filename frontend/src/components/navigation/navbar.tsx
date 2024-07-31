import { Component } from 'solid-js'
import LogOut from 'lucide-solid/icons/log-out'
import { Button } from '@/components/ui/button'
import { logout } from '@/stores/auth'
import { LocaleText } from '@/components/common/localeText'
import ThemeToggle from '@/components/common/themeToggle'
import LocaleSelect from '@/components/common/localeSelect'

const Navbar: Component = () => {
    // Render
    return (
        <div class="flex h-10 w-full items-center justify-between bg-background px-4 py-2 shadow-sm border-b">
            <LocaleText text="navbar.title" size="lg" />
            <div class="flex items-center gap-2">
                <ThemeToggle />
                <LocaleSelect />
                <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut size="20" />
                </Button>
            </div>
        </div>
    )
}

export default Navbar
