import { Flag, Stats } from '@/types/structs'
import { Accessor, createContext, createSignal, JSX } from 'solid-js'

type FlagsContextType = {
    flags: Accessor<Flag[]>
    setFlags: (flags: Flag[]) => void
    stats: Accessor<Stats>
    setStats: (stats: Stats) => void
}

type FlagsProviderProps = {
    children: JSX.Element
}

export const FlagsContext = createContext<FlagsContextType>(
    {} as FlagsContextType
)

export const FlagsProvider = (props: FlagsProviderProps) => {
    const [flags, setFlags] = createSignal<Flag[]>([])
    const [stats, setStats] = createSignal<Stats>({
        flags: 0,
        queued: 0,
        success: 0,
        failed: 0,
    })

    return (
        <FlagsContext.Provider value={{ flags, setFlags, stats, setStats }}>
            {props.children}
        </FlagsContext.Provider>
    )
}
