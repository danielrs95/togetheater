import React from 'react'
import {Link} from 'react-router-dom'

export default function NavbarButtons(){
	return(
		<div>
		<Link className='btn btn-success mr-2' to="/login">Login</Link>
		<Link className='btn btn-success' to="/Register">Register</Link>
		</div>
	)
}


