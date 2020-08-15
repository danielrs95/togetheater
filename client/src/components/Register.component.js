import React, {useState} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Declaramos la configuracion afuera del componente para que funcione el toast
toast.configure()

// https://bluuweb.github.io/react/formularios/#state
export default function Register(){
	const [data, setData] = useState({
		email: '',
		password: ''
	})

	const history = useHistory()

	const handleInputChange = (e) => {
		// console.log(e.target.value)
		setData({
			...data,
			[e.target.name] : e.target.value
		})
	}

	const sentData = async(e) =>{
		e.preventDefault()

		const ServerCall = await axios.post("http://localhost:5000/users/register", data)
		// Para mostrar la data que responde el servidor
		// console.log(ServerCall)
		history.push("/login")

		// Manejo de errores
		if(ServerCall.data.error){
			if(ServerCall.data.error.errors.email){
				toast.error(ServerCall.data.error.errors.email.properties.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if(ServerCall.data.error.errors.password){
				toast.error(ServerCall.data.error.errors.password.properties.message, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	}

	return(
		<div className="container">
			<div className="d-flex justify-content-center h-100">

				<div className="card">

					<div className="card-header">
						<h3>Sign Up</h3>
					</div>

					<div className="card-body">
						<Form onSubmit={sentData}>
						  <Form.Group 
						  className='d-flex'
						  controlId="formBasicEmail">
						  	<span 
						  	className="input-group-text"><i className="fas fa-user"></i></span>
						    <Form.Control 
							    type="email" 
							    placeholder="Email" 
							    name="email"
							    onChange={handleInputChange}/>
						  </Form.Group>

						  <Form.Group 
						  className='d-flex'
						  controlId="formBasicPassword">
						  	<span className="input-group-text"><i className="fas fa-key"></i></span>
						    <Form.Control 
						    	type="password" 
						    	placeholder="Password" 
						    	name="password"
						    	onChange={handleInputChange}/>
						  </Form.Group>

						  <Button 
						  className='float-right'
						  variant="primary" 
						  type="submit">
						    Register
						  </Button>
						</Form>
					</div>

					<div className="card-footer">
						<div className="d-flex justify-content-center">
							<span>Already have an account?</span>
							<Link className='ml-2' to="/Login">Log in</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}