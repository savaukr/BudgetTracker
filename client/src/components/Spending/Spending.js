import React, {useState, useEffect, useCallback, useContext} from 'react'
import './spending.css'
import {Modal} from '../Modal/Modal.js'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useMessage} from '../../hooks/message.hook'


export const Spending = ({spending, deleteSpending, updateSpending}) => {
    const [modalUpdateActive, setModalUpdateActive] = useState(false)
	const [modalDeleteActive, setModalDeleteActive] = useState(false)
	const [modalUpdateAnswer, setModalUpdateAnswer] = useState(false)
    const [modalDeleteAnswer, setModalDeleteAnswer] = useState(false)
	const [form, setForm]=useState({
		category: spending.category, amount: spending.amount
	})
    const {token, userId} = useContext(AuthContext)
    const {request} = useHttp()
    const message = useMessage()

    const id = spending.id

    useEffect(() => {
		window.M.updateTextFields()
	}, [])

    const deleteHandler = useCallback(async () => {
        try {
            const fetched = await request(`/api/spending/delete/${id}`, 'DELETE', null, {
				Authorization: `Bearer ${token}`
			})
            deleteSpending(fetched.id)
            message('Витрата успішно видалена')
        } catch (e) {

        }
    }, [token, id, request])

    const updateHandler = useCallback(async (data) => {
        try {
            const fetched = await request(`/api/spending/update/${id}`, 'PUT', {...data, userId: userId}, {
				Authorization: `Bearer ${token}`
			})
			updateSpending(fetched.id, fetched.category, fetched.amount)
            message('Витрата успішно змінена')

        } catch (e) {

        }
    }, [token, id, request])

    useEffect(() => {
		if (modalUpdateAnswer) {
            updateHandler({...form})
            setModalUpdateAnswer(false)
        } 	
	}, [modalUpdateAnswer])

    useEffect(() => {
		if (modalDeleteAnswer) {
            deleteHandler()
		    setModalDeleteAnswer(false)
        }
	}, [modalDeleteAnswer])


    const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

    

    return (
        <div className="spending-wrap">
                <div className="spending category">{spending.category}</div>
                <div className="spending">{spending.amount} грн.</div>
                <div className="spending changeSpend" onClick = {()=>setModalUpdateActive(true)}>
                    Змінити
                </div>
                <div className="spending deleteSpend" onClick = {()=>setModalDeleteActive(true)}>Видалити</div>
            
			<Modal 
				title={`Введіть  зміни`}
				active={modalUpdateActive}
				setActive={setModalUpdateActive}
				answer={modalUpdateAnswer}
				setAnswer={setModalUpdateAnswer}
			>
				<div className="row">
			        <div className="input-field">
			          <input 
					  	placeholder="Введіть суму"
						id={`amountModal${spending.id}`}
						name="amount"
						type="number"
						className="validate"
						value={form.amount}
						onChange={changeHandler}
					  />
			          <label htmlFor={`amountModal${spending.id}`}>Сума витрати</label>
			        </div>
			    </div>
			    <div className="row">
			        <div className="input-field">
			          <input 
					  	placeholder="Введіть категорію"
						id={`categoryModal${spending.id}`}
						type="text"
						name="category"
						className="validate"
						value={form.category}
						onChange={changeHandler}
					  />
			          <label htmlFor={`categoryModal${spending.id}`}>Категорія витрати</label>
			        </div>
			    </div>
				<h6>Ви підтверджуєте зміни?</h6>
			</ Modal>
			<Modal 
				title={`Ви дійсно хочете видалити?`}
				active={modalDeleteActive}
				setActive={setModalDeleteActive}
				answer={modalDeleteAnswer}
				setAnswer={setModalDeleteAnswer}
			>	
			</ Modal>

        </div>
        
    )
}