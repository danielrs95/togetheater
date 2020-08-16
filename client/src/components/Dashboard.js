import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Slider from '../carousel/Slider'
import {Link} from 'react-router-dom'

export default function Dashboard(){

	const [trending, setTrending] = useState([])
	const [nowPlaying, setNowPlaying] = useState([])
	const [popular, setPopular] = useState([])
	const [topRated, setTopRated] = useState([])
	const [upcoming, setUpcoming] = useState([])

	useEffect(()=>{
		const fetchData = () => {
			axios.all([
				axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`),
				axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`),
				axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`),
				axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`),
				axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`)
			])
			.then(axios.spread((trendingData, nowPlayingData, popularData, topRatedData, upcomingData)=>{
				const trending = trendingData.data.results.map(movie=>{return movie})
				const nowPlaying = nowPlayingData.data.results.map(movie=>{return movie})
				const popular = popularData.data.results.map(movie=>{return movie})
				const topRated = topRatedData.data.results.map(movie=>{return movie})
				const upcoming = upcomingData.data.results.map(movie=>{return movie})
				setTrending(trending)
				setNowPlaying(nowPlaying)
				setPopular(popular)
				setTopRated(topRated)
				setUpcoming(upcoming)
			}))
		}
		fetchData();
	}, [])

	return(
		<div className="mt-5">
			<Link className="dashboardTitle" to="/trending">Trending</Link>
			<Slider slides={trending} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/nowplaying">Now Playing</Link>
			<Slider slides={nowPlaying} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/popular">Popular</Link>
			<Slider slides={popular} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/TopRated">Top Rated</Link>
			<Slider slides={topRated} numberSlides={6} ></Slider>

			<Link className="dashboardTitle" to="/upcoming">Upcoming</Link>
			<Slider slides={upcoming} numberSlides={6} ></Slider>
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
