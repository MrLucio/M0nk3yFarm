import { cn } from '@/libs/cn'
import { JSX, splitProps } from 'solid-js'

type CellProps = JSX.HTMLAttributes<HTMLTableCellElement> & {
    class?: string
    children?: JSX.Element
}

const Cell = (props: CellProps) => {
    // Props
    const [local, rest] = splitProps(props as CellProps, ['class', 'children'])

    // Render
    return (
        <td class={cn(local.class, 'p-1')} {...rest}>
            {local.children}
        </td>
    )
}

export default Cell
