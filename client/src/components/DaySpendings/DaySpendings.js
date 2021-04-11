import React from 'react'
import './daySpendings.css'
import {Spending} from '../Spending/Spending'

export const DaySpendings = ({listSpendings, deleteSpending, updateSpending}) => {
	if (!listSpendings.length) {
		return <p className="center">Жодної витрати немає</p>
	}
	return (
		<div>
			<h1>Day spendings</h1>
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
		</div>
		
	)
}