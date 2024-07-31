import { localeTextProps } from '@/components/localeText'
import { JSX } from 'solid-js'

type JoinPath<A, B> = A extends string | number
    ? B extends string | number
        ? `${A}.${B}`
        : A
    : B extends string | number
      ? B
      : ''

type Flatten<T = any> = (
    T extends object
        ? {
              [K in keyof T]: T[K] extends object
                  ? JoinPath<K, Flatten<T[K]>>
                  : K
          }[Exclude<keyof T, symbol>]
        : string
) extends infer D
    ? Extract<D, string>
    : never

export type TableConfig<T = any> = {
    columns: TableColumn<T>[]
    page?: number
    pages?: number
    entriesPerPage?: number
}

export type TableColumn<T = any> = {
    title: localeTextProps['text']
    key: Flatten<T>
    sort?: 'asc' | 'desc'
    sortable?: boolean
    headerRenderer?: (column: TableColumn<T>) => JSX.Element
    renderer?: (value: any) => JSX.Element
    compare?: (a: T, b: T) => number
}

export type DropdownOption<T = string> = {
    value: T
    label: string
    disabled?: boolean
}

export type Flag = {
    flag: string
    sploit: string
    team: string
    time: string
    response: string
    status: string
}
