import { createSignal } from 'solid-js'
import {
    Select,
    SelectButtonTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import { DropdownOption } from '@/types/structs'
import { locale, setLocale } from '@/stores/locale'
import { Locale } from '@/config/enums'

const locales: DropdownOption<Locale>[] = [
    { value: Locale.EN, label: '🇺🇸' },
    { value: Locale.IT, label: '🇮🇹' },
]

const LocaleSelect = () => {
    // Signals
    const [value, setValue] = createSignal(
        locales.find((l) => l.value === locale.locale) ?? locales[0]
    )

    // Render
    return (
        <Select
            options={locales}
            optionValue="value"
            optionTextValue="label"
            itemComponent={(props) => (
                <SelectItem item={props.item}>
                    {props.item.rawValue.label}
                </SelectItem>
            )}
            onChange={(value) => {
                setValue(value)
                setLocale({ locale: value.value })
            }}
            disallowEmptySelection
            value={value()}
        >
            <SelectButtonTrigger class="text-xl">
                <SelectValue<DropdownOption>>
                    {(state) => state.selectedOption().label}
                </SelectValue>
            </SelectButtonTrigger>
            <SelectContent />
        </Select>
    )
}

export default LocaleSelect
