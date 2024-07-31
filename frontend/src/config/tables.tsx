import { LocaleText } from '@/components/localeText'
import { Flag, TableColumn, TableConfig } from '@/types/structs'
import ArrowDownAZ from 'lucide-solid/icons/arrow-down-a-z'
import ArrowUpAZ from 'lucide-solid/icons/arrow-up-a-z'

const genericTableConfig: TableConfig = {
    columns: [],
}

const genericColumn: TableColumn = {
    title: 'general.title',
    key: '',
    headerRenderer: (column) => (
        <div class="flex items-center gap-3">
            <LocaleText text={column.title} />
            <span class="text-primary-500">
                {column.sort == 'desc' ? (
                    <ArrowDownAZ size="18" />
                ) : column.sort == 'asc' ? (
                    <ArrowUpAZ size="18" />
                ) : null}
            </span>
        </div>
    ),
}

export const flagsColumns: TableColumn<Flag>[] = [
    { ...genericColumn, title: 'flags.flag', key: 'flag', sortable: false },
    { ...genericColumn, title: 'flags.sploit', key: 'sploit', sortable: false },
    { ...genericColumn, title: 'flags.team', key: 'team', sortable: false },
    { ...genericColumn, title: 'flags.time', key: 'time', sortable: false },
    { ...genericColumn, title: 'flags.status', key: 'status', sortable: false },
]

export const flagsTableConfig: TableConfig<Flag> = genericTableConfig && {
    columns: flagsColumns,
    entriesPerPage: 10,
}
