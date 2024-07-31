import { TableColumn, TableConfig } from '@/types/structs'
import { createMemo, For, splitProps } from 'solid-js'
import Cell from './cell'

type HeaderProps<T, U extends TableConfig<T> = TableConfig<T>> = {
    columns: TableColumn<T>[]
    onSortChange?: (sort: U['columns'][number]['key']) => void
}

const Header = <T,>(props: HeaderProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as HeaderProps<T>, [
        'columns',
        'onSortChange',
    ])

    // Memos
    const headerRenderer = createMemo(() => {
        return (column: TableColumn<T>) => {
            return column.headerRenderer?.(column)
        }
    })

    // Render
    return (
        <tr class="border-b">
            <For each={local.columns} {...rest}>
                {(column) => (
                    <Cell
                        class="hover:bg-accent rounded-sm cursor-pointer select-none"
                        onClick={() => local.onSortChange?.(column.key)}
                    >
                        {headerRenderer()(column)}
                    </Cell>
                )}
            </For>
        </tr>
    )
}

export default Header
