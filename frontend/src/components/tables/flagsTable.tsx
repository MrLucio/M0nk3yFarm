import Table, { TableProps } from '@/components/table'
import { Flag, TableConfig } from '@/types/structs'
import { splitProps, useContext } from 'solid-js'
import { FlagsContext } from '../providers/FlagsProvider'

type FlagsTableProps<T = Flag> = {
    data: T[]
    config: TableConfig<T>
    pages: number
    onPageChange: TableProps<T>['onPageChange']
    onSortChange: TableProps<T>['onSortChange']
    onLimitChange: TableProps<T>['onLimitChange']
}

function FlagsTable(props: FlagsTableProps) {
    // Hooks
    const { stats } = useContext(FlagsContext)

    // Props
    const [local, rest] = splitProps(props as FlagsTableProps, [
        'data',
        'config',
        'pages',
        'onPageChange',
        'onSortChange',
        'onLimitChange',
    ])

    return (
        <Table<Flag>
            data={local.data}
            config={local.config}
            pages={Math.ceil(stats().flags / (local.config.limit ?? 5))}
            onPageChange={local.onPageChange}
            onSortChange={local.onSortChange}
            onLimitChange={local.onLimitChange}
        />
    )
}

export default FlagsTable
