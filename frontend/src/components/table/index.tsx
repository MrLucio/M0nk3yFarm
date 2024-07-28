import { TableConfig } from '@/types/structs'
import { For, splitProps } from 'solid-js'
import Header from './header'
import Row from './row'

type ListProps<T> = {
    data: T[]
    config: TableConfig<T>
}

const Table = <T,>(props: ListProps<T>) => {
    // Props
    const [local, rest] = splitProps(props as ListProps<T>, ['data', 'config'])

    // Render
    return (
        <table class="w-full border-collapse table-fixed" {...rest}>
            <Header columns={local.config.columns} />
            <For each={local.data}>
                {(item, index) => (
                    <Row
                        class={
                            index() !== local.data.length - 1 ? 'border-b' : ''
                        }
                        data={item}
                        columns={local.config.columns}
                    />
                )}
            </For>
        </table>
    )
}

export default Table
