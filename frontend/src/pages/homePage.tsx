import { authAxios } from '@/api/axios'
import { FLAGS } from '@/config/endpoints'
import { createQuery } from '@tanstack/solid-query'
import { Component, createMemo, createSignal } from 'solid-js'
import { DropdownOption, Flag } from '@/types/structs'
import { flagsTableConfig } from '@/config/tables'
import Table from '@/components/table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import RefreshCcw from 'lucide-solid/icons/refresh-ccw'
import Plus from 'lucide-solid/icons/plus'
import { Button } from '@/components/ui/button'
import { RefreshInterval } from '@/config/enums'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectButtonTrigger,
} from '@/components/ui/select'
import { config, setConfig } from '@/stores/config'
import AddFlagDialog from '@/components/dialogs/addFlagDialog'
import { FLAGS_SEPARATOR } from '@/config/constants'

const refreshIntervals: DropdownOption<RefreshInterval>[] = [
    { value: RefreshInterval.OFF, label: 'Off' },
    { value: RefreshInterval.FIVE_SECONDS, label: '5s' },
    { value: RefreshInterval.TEN_SECONDS, label: '10s' },
    { value: RefreshInterval.THIRTY_SECONDS, label: '30s' },
    { value: RefreshInterval.ONE_MINUTE, label: '1m' },
    { value: RefreshInterval.TWO_MINUTES, label: '2m' },
    { value: RefreshInterval.FIVE_MINUTES, label: '5m' },
    { value: RefreshInterval.FIFTEEN_MINUTES, label: '15m' },
    { value: RefreshInterval.THIRTY_MINUTES, label: '30m' },
    { value: RefreshInterval.ONE_HOUR, label: '1h' },
    { value: RefreshInterval.TWO_HOURS, label: '2h' },
    { value: RefreshInterval.ONE_DAY, label: '1d' },
]

const HomePage: Component = () => {
    // Signals
    const [value, setValue] = createSignal(
        refreshIntervals.find((r) => r.value === config.refreshInterval) ??
            refreshIntervals[0]
    )
    const [addDialogOpen, setAddDialogOpen] = createSignal(false)

    // Methods
    const submitFlags = (flags: string) => {
        // flags.split(FLAGS_SEPARATOR)
    }

    // Memos
    const refreshInterval = createMemo<number>(() =>
        parseInt(value().value.toString())
    )

    // Queries
    const flagsQuery = createQuery<Flag[]>(() => ({
        queryKey: ['flags'],
        queryFn: async () => {
            return authAxios
                .get(FLAGS)
                .then((res) => res.data)
                .then((data) => {
                    return data
                })
        },
        select(data) {
            return data.sort(() => 0.5 - Math.random()) //.sort((a, b) => a.time.localeCompare(b.time))
        },
        refetchInterval: isNaN(refreshInterval()) ? false : refreshInterval(), // NaN when OFF
    }))

    // Render
    return (
        <>
            <div class="flex p-4 gap-4">
                <Card class="w-1/4">
                    <CardHeader>
                        <h2 class="text-2xl font-bold">Roba a caso</h2>
                    </CardHeader>
                </Card>
                <Card class="w-3/4">
                    <CardHeader class="p-4 pb-0 items-end">
                        <div class="flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setAddDialogOpen(true)}
                            >
                                <Plus size="20" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => flagsQuery.refetch()}
                            >
                                <RefreshCcw size="20" />
                            </Button>
                            <Select
                                options={refreshIntervals}
                                optionValue="value"
                                optionTextValue="label"
                                itemComponent={(props) => (
                                    <SelectItem item={props.item}>
                                        {props.item.rawValue.label}
                                    </SelectItem>
                                )}
                                onChange={(value) => {
                                    setValue(value)
                                    setConfig({ refreshInterval: value.value })
                                }}
                                disallowEmptySelection
                                value={value()}
                            >
                                <SelectButtonTrigger>
                                    <SelectValue<DropdownOption>>
                                        {(state) =>
                                            state.selectedOption().label
                                        }
                                    </SelectValue>
                                </SelectButtonTrigger>
                                <SelectContent />
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent class="p-4">
                        <Table<Flag>
                            data={flagsQuery.data ?? []}
                            config={flagsTableConfig}
                        />
                    </CardContent>
                </Card>
            </div>
            <AddFlagDialog
                open={addDialogOpen()}
                onOpenChange={setAddDialogOpen}
                onSubmit={(flags) => {
                    setAddDialogOpen(false)
                    submitFlags(flags)
                }}
            />
        </>
    )
}

export default HomePage
