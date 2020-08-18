import React, {useContext} from 'react';
import axios from 'axios'
import AuthGlobal from "../context/store/AuthGlobal";

function Wishlist() {
	const context = useContext(AuthGlobal);

	const url = "/api/movies/"
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
		console.log(ServerCall.data)
	}

	return (
		<div className='container mt-5'>
			<div>
				<h1 className='componentTitle'>Welcome to your wishlist movies</h1>
			</div>
			<h1 onClick={()=>{listMovies()}}>Wishlist</h1>
		</div>
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
