import React, {useState, useEffect} from 'react'
import {Modal} from '../Modal/Modal.js'
import './daySpendings.css'

export const DaySpendings = () => {
	const [modal1Active, setModal1Active] = useState(false)
	const [modal2Active, setModal2Active] = useState(false)
	const [modalAnswer, setModalAnswer] = useState(false)

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	useEffect(() => {
		modalAnswer ? console.log('yes'): console.log('no')
		setModalAnswer(false)
	}, [modalAnswer])

	return (
		<div>

			<h1>Day spendings</h1>
			<span className="changeSpend" onClick = {()=>setModal1Active(true)}>
				Змінити
			</span>
			<span className="deleteSpend" onClick = {()=>setModal2Active(true)}>Видалити</span>
			<Modal 
				title={`Введіть  зміни`}
				active={modal1Active}
				setActive={setModal1Active}
				answer={modalAnswer}
				setAnswer={setModalAnswer}
			>
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
				<h6>Ви підтверджуєте зміни?</h6>
			</ Modal>
			<Modal 
				title={`Ви дійсно хочете видалити?`}
				active={modal2Active}
				setActive={setModal2Active}
				answer={modalAnswer}
				setAnswer={setModalAnswer}
			>
				
			</ Modal>
		</div>
		
	)
}