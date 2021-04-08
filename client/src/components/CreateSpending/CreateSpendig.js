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
			          <input placeholder="Введіть суму" id="amount" type="text" className="validate"/>
			          <label htmlFor="amount">Сума витрати</label>
			        </div>
			    </div>
			    <div className="row">
			    	<div className="input-field">
				    	<select value={selectValue} onChange={(event)=>setSelectValue(event.target.value)}>
						  <option value="grapefruit">Грейпфрут</option>
						  <option value="lime">Лайм</option>
						  <option value="coconut">Кокос</option>
						  <option value="mango">Манго</option>
						</select>
					</div>
			    </div>
			    <div className="row">
			    	<button 
						className="btn waves-effect waves-light"
						type="submit"
						name="calculate"
						onClick={()=>{}}
					>
						Додати витрату 
					</button>	
			    </div>
			</div>
    )
}