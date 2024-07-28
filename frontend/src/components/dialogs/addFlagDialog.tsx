import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { createEffect, createSignal, splitProps } from 'solid-js'
import { DialogRootOptions } from '@kobalte/core/dialog'
import { TextField, TextFieldRoot } from '../ui/textfield'
import { LocaleText } from '../localeText'
import { Button } from '../ui/button'
import useTranslation from '@/locale'

type AddFlagDialogProps = {
    open: boolean
    onOpenChange: DialogRootOptions['onOpenChange']
    onSubmit: (flags: string) => void
}

const AddFlagDialog = (props: AddFlagDialogProps) => {
    // Props
    const [local, rest] = splitProps(props, [
        'open',
        'onOpenChange',
        'onSubmit',
    ])

    // Hooks
    const { t } = useTranslation()

    // Signals
    const [flags, setFlags] = createSignal<string>('')

    // Effects
    createEffect(() => {
        if (local.open) setFlags('')
    })

    // Render
    return (
        <Dialog open={local.open} onOpenChange={local.onOpenChange} {...rest}>
            <DialogContent class="sm:max-w-[425px]">
                <form
                    class="grid gap-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        local.onSubmit(flags())
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            <LocaleText text="flags.addFlags" />
                        </DialogTitle>
                        <DialogDescription>
                            <LocaleText text="flags.addFlagsDescription" />
                        </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                        <TextFieldRoot class="w-full">
                            <TextField
                                name="flags"
                                type="text"
                                placeholder={t('flags.flag')}
                                value={flags()}
                                onInput={(e) => setFlags(e.currentTarget.value)}
                            />
                        </TextFieldRoot>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            <LocaleText text="general.submit" />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddFlagDialog
