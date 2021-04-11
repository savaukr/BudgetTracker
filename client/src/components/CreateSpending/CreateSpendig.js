import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useMessage} from '../../hooks/message.hook'



import './createSpending.css'


export const CreateSpending = ({addSpending, valueDate}) => {
	const initialState = {
		amount:'',
		category: ''
	}
	const [form, setForm] = useState(initialState)

	const auth = useContext(AuthContext)
	const {loading, request } = useHttp()
	const message = useMessage()
	

	const changeHandler = (event) => {
		setForm({...form, [event.target.name]: event.target.value})
	}
	const strDate = `${valueDate.getFullYear()}-${valueDate.getMonth()}-${valueDate.getDate()}`
	
	const addSpendingHandler = async () => {
		try {
			const data = await request('/api/spending/create', 'POST', {...form, date:strDate, userId:auth.userId}, {
				Authorization:`Bearer ${auth.token}`
			})
			addSpending(data.newSpending)
			message(data.message)
		} catch (e) {
			message(e.message)
		}
	}

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	return (
			<div className="createSpending">
				<div className="row">
			        <div className="input-field">
			          <input 
					  	placeholder="Введіть суму"
						id="amount"
						className="validate"
						type="number"
						name="amount"
						onChange={changeHandler}
					  />
			          <label htmlFor="amount">Сума витрати</label>
			        </div>
			    </div>
			    <div className="row">
			        <div className="input-field">
			          <input
					    placeholder="Введіть категорію"
					    id="category"
						className="validate"
						type="text"
						name="category"
						onChange={changeHandler}
					  />
			          <label htmlFor="category">Категорія витрати</label>
			        </div>
			    </div>
			    <div className="row">
			    	<button 
						className="btn waves-effect waves-light"
						type="submit"
						name="addSpending"
						onClick={addSpendingHandler}
						disabled={loading}
					>
						Додати витрату 
					</button>	
			    </div>
			</div>
    )
}