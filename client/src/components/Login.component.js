import React, {useContext, useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import AuthGlobal from "../context/store/AuthGlobal";
import { loginUser } from "../context/actions/autenticacion.action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Declaramos la configuracion afuera del componente para que funcione el toast
toast.configure()

// https://bluuweb.github.io/react/formularios/#state

export default function Login(props){
	const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.history.push("/");
    }
    setShowChild(true);
  }, [context.stateUser.isAuthenticated, props.history]);

  const handleSubmit = e => {
    const user = {
      email,
      password
    };

    if (email === "" || password === "") {
    	toast.error("Credenciales erroneas, intente de nuevo", {
    		position: "top-right",
    		autoClose: 5000,
    		hideProgressBar: false,
    		closeOnClick: true,
    		pauseOnHover: true,
    		draggable: true,
    		progress: undefined,
    	});
      // seterror("Ingrese datos correctamente");
      // console.log(error)
    } else {
      loginUser(user, context.dispatch, seterror);
    }
    e.preventDefault();
  };


  if (!showChild){
  	return null;
  } else {
  	return(
  		<div className="container">
	  		<div className="d-flex justify-content-center h-100">

	  			{/* Card for login form */}
	  			<div className="card card-form">

	  				<div className="card-header">
	  					<h3>Sign In</h3>
	  				</div>

	  				<div className="card-body">
	  					<Form onSubmit={handleSubmit}>
	  					  <Form.Group 
	  					  className="d-flex" 
	  					  controlId="formBasicEmail">
	  					    <span 
	  					    className="input-group-text"><i className="fas fa-user"></i></span>
	  					    <Form.Control 
	  					    	className="d-inline"
	  						    type="email" 
	  						    placeholder="Email" 
	  						    name="email"
	  						    onChange={e=> setEmail(e.target.value)}/>
	  					  </Form.Group>

	  					  <Form.Group className="d-flex" controlId="formBasicPassword">
	  					  	<span className="input-group-text"><i className="fas fa-key"></i></span>
	  					    <Form.Control 
	  					    	className="d-inline"
	  					    	type="password" 
	  					    	placeholder="Password" 
	  					    	name="password"
	  					    	onChange={e=> setPassword(e.target.value)}/>
	  					  </Form.Group>

	  					  <Button className='float-right' variant="primary" type="submit">
	  					    Login
	  					  </Button>
	  					</Form>
	  				</div>

	  				<div className="card-footer">
	  					<div className="d-flex justify-content-center">
	  						<span>Don't have an account?</span>
	  						<Link className='ml-2' to="/Register">Sign up</Link>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
  		</div>
  	)
  }
}