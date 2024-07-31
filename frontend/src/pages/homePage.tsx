import { authAxios } from '@/api/axios'
import { FLAGS } from '@/config/endpoints'
import { createQuery, keepPreviousData } from '@tanstack/solid-query'
import { Component, createMemo, createSignal } from 'solid-js'
import { DropdownOption, Flag, TableConfig } from '@/types/structs'
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
import { FlagsResponse } from '@/types/responses'
import { createStore, produce } from 'solid-js/store'

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
    const [tableConfig, setTableConfig] =
        createStore<TableConfig<Flag>>(flagsTableConfig)
    const [addDialogOpen, setAddDialogOpen] = createSignal(false)

    // Methods
    const submitFlags = (flags: string) => {
        // flags.split(FLAGS_SEPARATOR)
    }

    // Memos
    const refreshInterval = createMemo<number>(() =>
        parseInt(value().value.toString())
    )

    const sortOptions = createMemo<string>(() => {
        return tableConfig.columns
            .reduce<string[]>((acc, column) => {
                if (column.sort) {
                    return [...acc, `${column.key}.${column.sort}`]
                }
                return acc
            }, [])
            .join(',')
    })

    const onPageChange = (page: number) => {
        setTableConfig({ page })
    }

    const onSortChange = (x: string) => {
        setTableConfig(
            produce((state) => {
                state.columns.find((column) => {
                    if (column.key === x) {
                        column.sort =
                            column.sort === undefined
                                ? 'asc'
                                : column.sort === 'asc'
                                  ? 'desc'
                                  : undefined
                    }
                })
            })
        )
    }

    // Queries
    const flagsQuery = createQuery<FlagsResponse>(() => ({
        queryKey: ['flags', tableConfig],
        queryFn: async () => {
            return authAxios
                .get(FLAGS, {
                    params: {
                        page: (tableConfig.page ?? 1) - 1,
                        sort: sortOptions(),
                    },
                })
                .then((res) => res.data)
                .then((data) => {
                    return data
                })
        },
        select(data) {
            return data
        },
        refetchInterval: isNaN(refreshInterval()) ? false : refreshInterval(),
        placeholderData: keepPreviousData,
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
                            data={flagsQuery.data?.flags ?? []}
                            config={tableConfig}
                            pages={30}
                            onPageChange={onPageChange}
                            onSortChange={onSortChange}
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
