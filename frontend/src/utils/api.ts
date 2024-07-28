export const buildAuthorization = (username: string, password: string) => {
    return 'Basic ' + btoa(username + ':' + password)
}
