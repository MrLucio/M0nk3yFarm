import { createResource } from 'solid-js'
import * as i18n from '@solid-primitives/i18n'
import en from './i18n/english'
import { Locale } from '@/config/enums'
import { locale } from '@/stores/locale'

type RemoveObjectKeys<T> = {
    [K in keyof T as T[K] extends i18n.BaseDict ? never : K]: T[K]
}

export type RawDictionary = typeof en
export type Dictionary = RemoveObjectKeys<i18n.Flatten<RawDictionary>>

async function fetchDictionary(locale: Locale): Promise<Dictionary> {
    const dict: RawDictionary = (await import(`./i18n/${locale}.ts`)).default
    return i18n.flatten(dict)
}

const useTranslation = () => {
    const [dict] = createResource(() => locale.locale, fetchDictionary, {
        initialValue: i18n.flatten(en),
    })

    return { t: i18n.translator(dict) }
}

export default useTranslation
