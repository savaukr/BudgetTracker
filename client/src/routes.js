import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage}  from './pages/HomePage.js'
import {AuthPage} from './pages/AuthPage.js'

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/spending" exact>
					<HomePage />
				</Route>				
				<Redirect to="/spending" />
			</Switch>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}