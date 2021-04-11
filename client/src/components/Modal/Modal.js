import React from 'react'
import './modal.css'

export const Modal = ({active, setActive, setAnswer, title, children}) => {
	return (
		<div
			className={active ? 'modal__overlay active': 'modal__overlay'}
			onClick = {()=>setActive(false)}
		>
			<div className={active ? 'modal__content active': 'modal__content'} onClick={e=>e.stopPropagation()}>
				<div className="modal__close" onClick = {()=>setActive(false)}>
					&times;
				</div>
				<div className="modal__title">
					<h5>{title}</h5>
				</div>
				<hr/>
				<div className="modal__body">
					{children}
				</div>
				<button 
					className="btn waves-effect waves-light"
					onClick={ ()=> {
						setActive(false)
					}}
				>
					Ні
				</button>
				<button
					 className="btn waves-effect waves-light #03a9f4 light-blue"
					 onClick={()=> {
				        setAnswer(true)
					 	setActive(false)
					 }}
				>
					Так
				</button>
			</div>
		</div>

	)
}