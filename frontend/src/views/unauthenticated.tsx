import { Component } from 'solid-js'
import { Navigate, Route, Router } from '@solidjs/router'
import LoginPage from '@/pages/loginPage'

const UnauthenticatedView: Component = () => {
    // Render
    return (
        <Router>
            <Route path="/" component={LoginPage} />
            <Route path="*" component={() => <Navigate href="/" />} />
        </Router>
    )
}

export default UnauthenticatedView
