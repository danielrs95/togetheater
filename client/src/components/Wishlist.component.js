import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import AuthGlobal from "../context/store/AuthGlobal";
import View from '../views/View.component.js';


function Wishlist() {
	const context = useContext(AuthGlobal);
	const url = "/api/movies/"
	let token = localStorage.getItem('jwt')

	const config = {
		params: {
			user: context.stateUser.user.userId
		},
		headers: {
			Authorization: token
		}
	}

	const [wishlist, setWishlist] = useState([])

	useEffect(()=>{
		const listMovies = async() => {
			const ServerCall = await axios.get(url, config)
			.then(function(response){
				return response.data
			})
			.catch(function(error){
				console.log(error)
			})
			setWishlist(ServerCall)
			// Ver la respuesta
			console.log(ServerCall)
		}
		listMovies();
	}, [])

	return (
		<div className='container-fluid mt-5 pt-1'>
			<div>
				<h1 className='componentTitle'>My wishlist</h1>
			</div>
			<div className="row no-gutters">
				{wishlist.map((result,index)=>{
					return(
						<div
							className="wishlistContainer col-sm-6 col-md-4 col-lg-2"
							key={result.api_movie_id}>
								<img
									className="posterImage"
									src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
									alt={result.title}/>
						</div>
					)
				})}
			</div>
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
