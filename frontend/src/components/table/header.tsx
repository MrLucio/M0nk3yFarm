import { TableColumn } from '@/types/structs'
import { For, splitProps } from 'solid-js'
import Cell from './cell'

type HeaderProps<T> = {
    columns: TableColumn<T>[]
}

const Header = <T,>(props: HeaderProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as HeaderProps<T>, ['columns'])

    // Render
    return (
        <tr class="border-b">
            <For each={local.columns} {...rest}>
                {(column) => (
                    <Cell>
                        {column.headerRenderer &&
                            column.headerRenderer(column.title)}
                    </Cell>
                )}
            </For>
        </tr>
    )
}

export default Header
