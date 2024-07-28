export const getEnv = (key: string) => {
    const value = import.meta.env[key]
    if (value === undefined) {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value
}

export const getStringEnv = (key: string): string => getEnv(key)
export const getNumberEnv = (key: string): number => Number(getEnv(key))
export const getBooleanEnv = (key: string): boolean => Boolean(getEnv(key))
