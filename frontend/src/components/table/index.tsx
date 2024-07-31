import { DropdownOption, TableConfig } from '@/types/structs'
import { createMemo, For, splitProps } from 'solid-js'
import Header from './header'
import Row from './row'
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { LocaleText } from '../common/localeText'

export type TableProps<T, U extends TableConfig<T> = TableConfig<T>> = {
    data: T[]
    config: U
    pages?: number
    onPageChange?: (page: number) => void
    onSortChange?: (sort: U['columns'][number]['key']) => void
    onLimitChange?: (limit: number) => void
}

const entriesOptions: DropdownOption<number>[] = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
]

const Table = <T,>(props: TableProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as TableProps<T>, [
        'data',
        'config',
        'pages',
        'onPageChange',
        'onSortChange',
        'onLimitChange',
    ])

    // Memos
    const limit = createMemo<DropdownOption<number>>(() => {
        return (
            entriesOptions.find((option) => {
                return option.value === local.config.limit
            }) ?? entriesOptions[0]
        )
    })

    // Render
    return (
        <>
            <table class="w-full border-collapse table-fixed mb-4" {...rest}>
                <Header
                    columns={local.config.columns}
                    onSortChange={local.onSortChange}
                />
                <For each={local.data}>
                    {(item, index) => (
                        <Row
                            class={
                                index() !== local.data.length - 1
                                    ? 'border-b'
                                    : ''
                            }
                            data={item}
                            columns={local.config.columns}
                        />
                    )}
                </For>
            </table>
            <div class="flex items-center text-right">
                <div class="absolute">
                    <div class="flex items-center gap-3">
                        <Select
                            options={entriesOptions}
                            optionValue="value"
                            optionTextValue="label"
                            itemComponent={(props) => (
                                <SelectItem item={props.item}>
                                    {props.item.rawValue.label}
                                </SelectItem>
                            )}
                            onChange={(value) =>
                                local.onLimitChange?.(value.value)
                            }
                            disallowEmptySelection
                            value={limit()}
                        >
                            <SelectTrigger hideIcon>
                                <SelectValue<DropdownOption>>
                                    {(state) =>
                                        state.selectedOption().label ?? ''
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent />
                        </Select>
                        <LocaleText text="pagination.perPage" />
                    </div>
                </div>
                <Pagination
                    count={local.pages ?? 5}
                    fixedItems
                    itemComponent={(props) => (
                        <PaginationItem page={props.page}>
                            {props.page}
                        </PaginationItem>
                    )}
                    ellipsisComponent={() => <PaginationEllipsis />}
                    onPageChange={(page) => {
                        local.onPageChange?.(page)
                    }}
                >
                    <PaginationPrevious />
                    <PaginationItems />
                    <PaginationNext />
                </Pagination>
            </div>
        </>
    )
}

export default Table
