import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Header} from '../components/Header/Header.js'
import {Footer} from '../components/Footer/Footer.js'
//import {Calendar} from '../components/Calendar/Calendar.js'
import {CreateSpending} from '../components/CreateSpending/CreateSpendig.js'
import {DaySpendings} from '../components/DaySpendings/DaySpendings.js'
import {Loader} from '../components/Loader/Loader'
import Calendar from 'react-calendar'
import './homePage.css'

export const HomePage = () => {
	const [listSpendings, setListSpendings] = useState()
	const [value, onChange] = useState(new Date)
	const {request, loading} = useHttp()
	const {token} = useContext(AuthContext)
	console.log(value)
	const fetchSpendings = useCallback(async () => {
		try {
			const data = await request('/api/spending/', 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			if (data) setListSpendings(data)
		} catch (e) {}
	}, [token, request])

	const addSpending = (spending) => {
		setListSpendings((prev) => {
			return [...prev, spending]
		})
	}
	const deleteSpending = (id) => {
		setListSpendings((prev) => {
			const data = prev.filter(item => item.id !== id)
			return data
		})
	}

	const updateSpending = (id, category, amount) => {
		setListSpendings((prev) => {
			const data = prev.map(item => {
				if (item.id === id) {
					 item.amount = amount
					 item.category = category
				}
				return item
			})
			return data
		})
	}

	useEffect(() => {
		fetchSpendings()
	}, [fetchSpendings])


	return (
		<>
			<Header/>
			<main>
				<div className="main__content">
					<div className='calendar-wrap'>
						<Calendar 
							onChange={onChange}
							value={value}
						/>
					</div>
					<CreateSpending addSpending={addSpending} valueDate={value}/>
				</div>
				<div className="main__content">
					{loading 
						? <Loader /> :
						<DaySpendings 
							listSpendings={listSpendings || []}
							deleteSpending={deleteSpending}
							updateSpending={updateSpending}
						/>
					}
				</div>	
			</main>
			<Footer />
		</>
		
	)
}