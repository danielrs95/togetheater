import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Slider from '../carousel/Slider'
import {Link} from 'react-router-dom'
import AuthGlobal from "../context/store/AuthGlobal";

export default function Dashboard(){
	const context = useContext(AuthGlobal);

	return(
		<div className="mt-5">
			<Link className="dashboardTitle" to="/trending">Trending</Link>
			<Slider slides={context.trending} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/nowplaying">Now Playing</Link>
			<Slider slides={context.nowPlaying} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/popular">Popular</Link>
			<Slider slides={context.popular} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/TopRated">Top Rated</Link>
			<Slider slides={context.topRated} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/upcoming">Upcoming</Link>
			<Slider slides={context.upcoming} numberSlides={6} ></Slider>
		</div>
	)
}

// Peticion con axios y useEffect``
// const fetchData = () => {
// 	axios.get(
// 		`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
// 	).then(res => {
// 		const movie_map = res.data.results.map(movie=>{
// 			return movie
// 		})
// 		setTrending(movie_map)
// 	})
// }
