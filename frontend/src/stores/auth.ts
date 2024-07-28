import { createStore } from 'solid-js/store'

const [auth, setAuth] = createStore<{
    username: string | null
    password: string | null
}>({
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
})

const logout = () => {
    setAuth({
        username: null,
        password: null,
    })
}

export { auth, setAuth, logout }
