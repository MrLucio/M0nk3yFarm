import { TableColumn } from '@/types/structs'
import { For, JSX, splitProps } from 'solid-js'
import Cell from './cell'

type RowProps<T> = JSX.HTMLAttributes<HTMLTableRowElement> & {
    data: T
    columns: TableColumn<T>[]
}

const Row = <T,>(props: RowProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as RowProps<T>, ['data', 'columns'])

    // Render
    return (
        <tr {...rest}>
            <For each={local.columns}>
                {(column, index) => {
                    return (
                        <Cell
                            class={
                                index() !== local.columns.length - 1
                                    ? 'border-r'
                                    : ''
                            }
                        >
                            {column.renderer
                                ? column.renderer(local.data)
                                : ((local.data[column.key] ??
                                      '') as JSX.Element)}
                        </Cell>
                    )
                }}
            </For>
        </tr>
    )
}

export default Row
