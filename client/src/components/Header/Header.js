import React, {useContext} from 'react'
import './header.css'

import {AuthContext} from '../../context/AuthContext.js'


export const Header = () => {

	const auth = useContext(AuthContext)

	const exitHandler = () => {
		auth.logout()
	}
	return (
		<header className='header-wrap'>
			<h6 className = 'logo'>
				ElifTech
			</h6>
			<h5>
				Budjet Tracker
			</h5>
			<div className = 'userName'>
				<div>Ви увійшли, як <b>{auth.userName ? auth.userName : 'unknow user'}</b></div>
				<button className="btn waves-effect waves-light" onClick={exitHandler}>
					Вийти
				</button>
			</div>
		</header>
	)
}