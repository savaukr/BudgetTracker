import React, {useState} from 'react'
import {Header} from '../components/Header/Header.js'
import {Footer} from '../components/Footer/Footer.js'
import {Calendar} from '../components/Calendar/Calendar.js'
import {CreateSpending} from '../components/CreateSpending/CreateSpendig.js'
import {DaySpendings} from '../components/DaySpendings/DaySpendings.js'
import './homePage.css'

export const HomePage = () => {
	return (
		<>
			<Header/>
			<main>
				<div className="main__content">
					<Calendar />
					<CreateSpending />
				</div>
				<div className="main__content">
					<DaySpendings />
				</div>	
			</main>
			<Footer />
		</>
		
	)
}