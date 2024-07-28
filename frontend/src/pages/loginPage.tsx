import { LocaleText } from '@/components/localeText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    TextField,
    TextFieldLabel,
    TextFieldRoot,
} from '@/components/ui/textfield'
import type { Component } from 'solid-js'
import { setAuth } from '@/stores/auth'
import { createStore } from 'solid-js/store'
import { unauthAxios } from '@/api/axios'
import { toast } from 'solid-sonner'
import { INFO } from '@/config/endpoints'
import { buildAuthorization } from '@/utils/api'
import useTranslation from '@/locale'

const LoginPage: Component = () => {
    // Hooks
    const { t } = useTranslation()

    // Stores
    const [fields, setFields] = createStore({
        username: '',
        password: '',
    })

    // Methods
    const handleLogin = (e: Event) => {
        e.preventDefault()

        unauthAxios
            .get(INFO, {
                headers: {
                    Authorization: buildAuthorization(
                        fields.username,
                        fields.password
                    ),
                },
            })
            .then(() => {
                setAuth({
                    username: fields.username,
                    password: fields.password,
                })
            })
            .catch(() => {
                toast.error('Invalid username or password')
            })
    }

    // Render
    return (
        <div class="flex min-h-screen w-full bg-card justify-center items-center">
            <Card class="w-[400px]">
                <CardHeader>
                    <CardTitle>
                        <LocaleText text="login.title" size="lg" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form class="grid gap-4" onSubmit={handleLogin}>
                        <TextFieldRoot class="w-full">
                            <TextFieldLabel>
                                <LocaleText text="login.username" />
                            </TextFieldLabel>
                            <TextField
                                name="username"
                                type="text"
                                placeholder={t('login.username')}
                                value={fields.username}
                                autocomplete="username"
                                onInput={(e) =>
                                    setFields({
                                        ...fields,
                                        username: e.currentTarget.value,
                                    })
                                }
                            />
                        </TextFieldRoot>
                        <TextFieldRoot class="w-full">
                            <TextFieldLabel>
                                <LocaleText text="login.password" />
                            </TextFieldLabel>
                            <TextField
                                name="password"
                                type="password"
                                placeholder={t('login.password')}
                                value={fields.password}
                                autocomplete="current-password"
                                onInput={(e) =>
                                    setFields({
                                        ...fields,
                                        password: e.currentTarget.value,
                                    })
                                }
                            />
                        </TextFieldRoot>
                        <Button class="w-full" type="submit">
                            <LocaleText text="login.login" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage
