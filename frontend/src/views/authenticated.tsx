import { Component } from 'solid-js'
import { Navigate, Route, Router } from '@solidjs/router'
import HomePage from '@/pages/homePage'
import { QueryClientProvider } from '@tanstack/solid-query'
import { QueryClient } from '@tanstack/query-core'
import Navbar from '@/components/navigation/navbar'

const AuthenticatedView: Component = () => {
    // Queries
    const client = new QueryClient()

    // Render
    return (
        <QueryClientProvider client={client}>
            <Navbar />
            <Router>
                <Route path="/" component={HomePage} />
                <Route path="*" component={() => <Navigate href="/" />} />
            </Router>
        </QueryClientProvider>
    )
}

export default AuthenticatedView
