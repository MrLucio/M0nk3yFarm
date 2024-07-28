import { cn } from '@/libs/cn'
import type { ComponentProps, ParentComponent } from 'solid-js'
import { splitProps } from 'solid-js'

export const Card = (props: ComponentProps<'div'>) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return (
        <div
            class={cn(
                'rounded-xl border bg-card text-card-foreground shadow',
                local.class
            )}
            {...rest}
        />
    )
}

export const CardHeader = (props: ComponentProps<'div'>) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return (
        <div
            class={cn('flex flex-col space-y-1.5 p-6', local.class)}
            {...rest}
        />
    )
}

export const CardTitle: ParentComponent<ComponentProps<'h1'>> = (props) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return (
        <h1
            class={cn('font-semibold leading-none tracking-tight', local.class)}
            {...rest}
        />
    )
}

export const CardDescription: ParentComponent<ComponentProps<'h3'>> = (
    props
) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return (
        <h3
            class={cn('text-sm text-muted-foreground', local.class)}
            {...rest}
        />
    )
}

export const CardContent = (props: ComponentProps<'div'>) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return <div class={cn('p-6 pt-0', local.class)} {...rest} />
}

export const CardFooter = (props: ComponentProps<'div'>) => {
    // Props
    const [local, rest] = splitProps(props, ['class'])

    // Render
    return (
        <div class={cn('flex items-center p-6 pt-0', local.class)} {...rest} />
    )
}
