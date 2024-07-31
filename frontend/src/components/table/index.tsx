import { TableConfig } from '@/types/structs'
import { For, splitProps } from 'solid-js'
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

export type TableProps<T, U extends TableConfig<T> = TableConfig<T>> = {
    data: T[]
    config: U
    pages?: number
    onPageChange?: (page: number) => void
    onSortChange?: (sort: U['columns'][number]['key']) => void
}

const Table = <T,>(props: TableProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as TableProps<T>, [
        'data',
        'config',
        'pages',
        'onPageChange',
        'onSortChange',
    ])

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
            <Pagination
                count={local.pages ?? 10}
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
        </>
    )
}

export default Table
