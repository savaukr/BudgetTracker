import React from 'react'
import './daySpendings.css'
import {Spending} from '../Spending/Spending'

export const DaySpendings = ({listSpendings, deleteSpending, updateSpending, strDate}) => {
	if (!listSpendings.length) {
		return <h5 className="center">Жодної витрати немає за {strDate}</h5>
	}
	let total = listSpendings.reduce((sum, item)=> {
		return sum+(+item.amount)
	}, 0)
	return (
		<div>
			<h5>Витрати за {strDate}</h5>
			{listSpendings.map(spending=>{
				return (
					<Spending 
						key={spending.id}
						spending={spending}
						deleteSpending={deleteSpending}
						updateSpending={updateSpending}
					/>
				)
			})}
			<h5>Загалом: {total} грн.</h5>

		</div>
		
	)
}