import React, {useState, useEffect} from 'react'
import './createSpending.css'

export const CreateSpending = () => {
	const [selectValue, setSelectValue] = useState('grapefruit')
	const initialState = {
		amount:'',
		category: ''
	}
	const [form, setForm] = useState(initialState)

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	return (
			<div className="createSpending">
				<div className="row">
			        <div className="input-field">
			          <input placeholder="Введіть суму" id="amount" type="number" className="validate"/>
			          <label htmlFor="amount">Сума витрати</label>
			        </div>
			    </div>
			    <div className="row">
			        <div className="input-field">
			          <input placeholder="Введіть категорію" id="category" type="text" className="validate"/>
			          <label htmlFor="amount">Категорія витрати</label>
			        </div>
			    </div>
			    <div className="row">
			    	<button 
						className="btn waves-effect waves-light"
						type="submit"
						name="addSpending"
						onClick={() => console.log('add spending')}
					>
						Додати витрату 
					</button>	
			    </div>
			</div>
    )
}