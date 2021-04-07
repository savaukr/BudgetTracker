import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage}  from './pages/HomePage.js'
import {UpdateSpendingPage} from './pages/UpdateSpendingPage.js'
import {DeleteSpendingPage} from './pages/DeleteSpendingPage.js'
import {AuthPage} from './pages/AuthPage.js'

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/spending" exact>
					<HomePage />
				</Route>
				<Route path="/update/:id" exact >
					<UpdateSpendingPage />
				</Route>
				<Route path="/delete/:id" exact >
					<DeleteSpendingPage />
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