import Table, { TableProps } from '@/components/table'
import { Flag, TableConfig } from '@/types/structs'
import { splitProps } from 'solid-js'

type FlagsTableProps<T = Flag> = {
    data: T[]
    config: TableConfig<T>
    pages: number
    onPageChange: TableProps<T>['onPageChange']
    onSortChange: TableProps<T>['onSortChange']
}

function FlagsTable(props: FlagsTableProps) {
    // Props
    const [local, rest] = splitProps(props as FlagsTableProps, [
        'data',
        'config',
        'pages',
        'onPageChange',
        'onSortChange',
    ])

    return (
        <Table<Flag>
            data={local.data}
            config={local.config}
            pages={30}
            onPageChange={local.onPageChange}
            onSortChange={local.onSortChange}
        />
    )
}

export default FlagsTable
