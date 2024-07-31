import { JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import useTranslation, { Dictionary } from '@/locale'
import { cn } from '@/libs/cn'
import { ResolveArgs } from '@solid-primitives/i18n'
import { cva, VariantProps } from 'class-variance-authority'

export const localeTextVariants = cva('text-sm font-medium', {
    variants: {
        variant: {
            default: '',
        },
        size: {
            default: 'text-md',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
            xl: 'text-xl',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

export type localeTextProps<T extends keyof Dictionary = keyof Dictionary> = {
    text: T
    textArgs?: ResolveArgs<Dictionary[T], string>
    as?: keyof JSX.IntrinsicElements
} & VariantProps<typeof localeTextVariants> & {
        class?: string
    }

export const LocaleText = <T extends keyof Dictionary>(
    props: localeTextProps<T>
): JSX.Element => {
    // Props
    const [{ as: Component = 'p', ...local }, rest] = splitProps(
        props as localeTextProps<T>,
        ['text', 'class', 'variant', 'size', 'textArgs', 'as']
    )

    // Hooks
    const { t } = useTranslation()

    // Render
    return (
        <Dynamic
            component={Component}
            class={cn(
                localeTextVariants({
                    size: local.size,
                    variant: local.variant,
                }),
                local.class
            )}
            {...rest}
        >
            {t(
                local.text,
                ...(local.textArgs ??
                    ([] as ResolveArgs<Dictionary[T], string>))
            )}
        </Dynamic>
    )
}
