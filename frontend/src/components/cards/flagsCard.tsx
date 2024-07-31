import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    Select,
    SelectButtonTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import { DropdownOption, Flag, TableConfig } from '@/types/structs'
import AddFlagDialog from '@/components/dialogs/addFlagDialog'
import RefreshCcw from 'lucide-solid/icons/refresh-ccw'
import Plus from 'lucide-solid/icons/plus'
import { Button } from '@/components/ui/button'
import useTranslation from '@/locale'
import { createMemo, createSignal, useContext } from 'solid-js'
import { RefreshInterval } from '@/config/enums'
import { createStore, produce } from 'solid-js/store'
import { flagsTableConfig } from '@/config/tables'
import { config, setConfig } from '@/stores/config'
import { createQuery, keepPreviousData } from '@tanstack/solid-query'
import { FlagsResponse } from '@/types/responses'
import { authAxios } from '@/api/axios'
import { FLAGS } from '@/config/endpoints'
import { toast } from 'solid-sonner'
import FlagsTable from '@/components/tables/flagsTable'
import { FlagsContext } from '../providers/FlagsProvider'

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

function FlagsCard() {
    // Hooks
    const { t } = useTranslation()
    const { setFlags, setStats } = useContext(FlagsContext)

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

    const onPageChange = (page: number) => setTableConfig({ page })

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

    const onLimitChange = (limit: number) => {
        setTableConfig({ limit })
    }

    // Queries
    const flagsQuery = createQuery<FlagsResponse>(() => ({
        queryKey: ['flags', tableConfig],
        queryFn: async () => {
            return authAxios
                .get<FlagsResponse>(FLAGS, {
                    params: {
                        page: (tableConfig.page ?? 1) - 1,
                        sort: sortOptions(),
                        limit: tableConfig.limit ?? 5,
                    },
                })
                .then((res) => res.data)
                .then((data) => {
                    setFlags(data.flags)
                    setStats(data.stats)
                    return data
                })
                .catch((err) => {
                    toast.error(t('flags.fetchError'))
                    return err
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
            <Card class="w-4/5">
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
                                    {(state) => state.selectedOption().label}
                                </SelectValue>
                            </SelectButtonTrigger>
                            <SelectContent />
                        </Select>
                    </div>
                </CardHeader>
                <CardContent class="p-4">
                    <FlagsTable
                        data={flagsQuery.data?.flags ?? []}
                        config={tableConfig}
                        pages={30}
                        onPageChange={onPageChange}
                        onSortChange={onSortChange}
                        onLimitChange={onLimitChange}
                    />
                </CardContent>
            </Card>
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

export default FlagsCard
