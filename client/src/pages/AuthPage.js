import React, {useState, useEffect, useContext} from 'react'
import './authPage.css'
import {useHttp} from '../hooks/http.hook.js'
import {useMessage} from '../hooks/message.hook.js'
import {AuthContext} from '../context/AuthContext.js'


export const AuthPage = () => {

	const auth = useContext(AuthContext)
	const message = useMessage()
	const {loading, error, request, clearError} = useHttp()
	const [form, setForm]=useState({
		name:'', email:'', password:''
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = event => {
		setForm({...form, [event.target.name]: event.target.value})
	}

	const registerHandler =  async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			message(data.message)
		} catch (e) {}
	}

	const loginHandler =  async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId, data.userName)
		} catch (e) {}
	}

	return (			
		<div className="row">
			<div className="col s6 offset-s3">
			  <h3 className="center-align">Війдіть або зареєструйтесь</h3>
		      <div className="card blue-grey darken-1">
		        <div className="card-content white-text">
		          <span className="card-title">Введіть свої данні:</span>
		          <div>
		          	<div className="input-field">
				      <input 
				        placeholder="Введіть ім'я"
				        id="name"
				        type="text"
				        name="name"
				        value={form.name}
				        onChange={changeHandler}
				      />
				      <label htmlFor="name">Ім'я:</label>
				    </div>
		          	<div className="input-field">
				      <input 
				        placeholder="Введіть email"
				        id="email"
				        type="text"
				        name="email"
				        value={form.email}
				        onChange={changeHandler}
				      />
				      <label htmlFor="email">Email:</label>
				    </div>
				    <div className="input-field">
				      <input 
				        placeholder="Введіть пароль"
				        id="password"
				        type="password"
				        name="password"
				        value={form.password}
				        onChange={changeHandler}
				      />
				      <label htmlFor="password">Пароль:</label>
				    </div>
		          </div>
		        </div>
		        <div className="card-action">
			        <div className="button-wrap">
			          <button 
			          	className="btn-mrg btn waves-effect waves-light"
			          	name="sigin"
			          	onClick  = {loginHandler}
			          	disabled = {loading}
			          >
			          	Ввійти
					  </button>
					</div>
					<div className="button-wrap">
					  <button 
					  	className="btn-mrg btn waves-effect waves-light"
					  	name="auther"
					  	onClick = {registerHandler}
					  	disabled = {loading}
					  >
			          	Зареєструватись
					  </button>
					</div>
		        </div>
		      </div>
		    </div>
		</div>
	)
	
}