import React, {useContext} from 'react';
import axios from 'axios'
import AuthGlobal from "../context/store/AuthGlobal";

function Wishlist() {
	const context = useContext(AuthGlobal);

	const url = "http://localhost:5000/movies/"
	let token=localStorage.getItem('jwt')

	const config = {
		params: {
			user: context.stateUser.user.userId
		},
		headers: {
			Authorization: token
		}
	}

	const listMovies = async(data) => {
		const ServerCall = await axios.get(url, config)
		console.log(ServerCall)
	}

	return (
		<h1 onClick={()=>{listMovies()}}>Wishlist</h1>
	)
}

export default Wishlist
/* Otra manera de haber hecho la peticion
	// axios({
 //    url: 'http://localhost:5000/movies/',
 //    method: 'get',
 //    params: {
 //    	user: context.stateUser.user.userId
 //    },
 //    headers: {
 //      'Authorization': token,
 //    }
	// })
	// .then(response => {
	//   console.log(response)
	// }) 
	// .catch(err => {
	//   console.log(err);
	// });
*/