import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthGlobal from "../context/store/AuthGlobal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export default function View (props) {
	const context = useContext(AuthGlobal);

	const addMovie = async(data) => {
		let token=localStorage.getItem('jwt')
		const ServerCall = await axios.post("/api/movies/add", {
			api_movie_id: data.id,
			title: data.title,
			poster_path: data.poster_path,
			user: context.stateUser.user.userId,
		}, {
			headers: {
				Authorization: token
			}
		})
		// Alert message
		if(ServerCall.data.error){
			toast.error(ServerCall.data.msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.success(ServerCall.data.msg, {
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

	return(
		<div className='container-fluid mt-5 pt-1'>
			<div>
				<h1 className='componentTitle'>Movies beeing played</h1>
			</div>
			<div className="row no-gutters">

				{props.movies.map((result,index)=>{
					return(
						<div
							className="posterContainer col-sm-6 col-md-4 col-lg-2"
							key={result.id}
						>
							<div className="poster">
								<img
									className="posterImage"
									src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
									alt={result.title}/>
								<div className="posterInfo">
									<div className="posterText">
										<div className="posterTitle">
											<h5>{result.title}</h5>
											<div className="addWishlist">
												{context.stateUser.isAuthenticated === true ?
													<span>
														<i
															className="fas fa-plus-square"
															onClick={()=> {
																addMovie(result)
															}}
														>
														</i>
													</span>
													:
													<div></div>
												}
											</div>
										</div>

										<div className="d-flex">
											<i className="fas fa-calendar-alt"></i>
											<h6 className="ml-2">{result.release_date}</h6>
										</div>

										<div className="d-flex">
											<i className="fas fa-star"></i>
											<i className="fas fa-star"></i>
											<i className="fas fa-star"></i>
											<i className="fas fa-star"></i>
											<i className="fas fa-star-half"></i>
											<h6 className="">{result.vote_average}</h6>
										</div>
										<p>{result.overview}</p>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
