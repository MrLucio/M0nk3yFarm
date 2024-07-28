import { LocaleText } from '@/components/localeText'
import { Flag, TableColumn, TableConfig } from '@/types/structs'

const genericTableConfig: TableConfig = {
    columns: [],
}

const genericColumn: TableColumn = {
    title: '',
    key: '',
    headerRenderer: (value: any) => <LocaleText text={value} />,
}

export const flagsColumns: TableColumn<Flag>[] = [
    { ...genericColumn, title: 'flags.flag', key: 'flag', sortable: true },
    { ...genericColumn, title: 'flags.sploit', key: 'sploit', sortable: true },
    { ...genericColumn, title: 'flags.team', key: 'team', sortable: true },
    { ...genericColumn, title: 'flags.time', key: 'time', sortable: true },
    { ...genericColumn, title: 'flags.status', key: 'status', sortable: true },
]

export const flagsTableConfig: TableConfig<Flag> = genericTableConfig && {
    columns: flagsColumns,
}
