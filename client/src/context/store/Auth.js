import React, { useReducer, useEffect,useState } from "react";
import authReducer from "../reducers/autenticacion.reducer";
import { setCurrentUser } from "../actions/autenticacion.action";
import AuthGlobal from "./AuthGlobal";
import jwt_decode from "jwt-decode";
import axios from 'axios'

const Auth = props => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {}
  });
  const [showChild, setShowChild] = useState(false);
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

  useEffect(() => {
    if (localStorage.jwt) {
      const decoded = localStorage.jwt ? localStorage.jwt : "";
      dispatch(setCurrentUser(jwt_decode(decoded)));
    }
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          trending,
          nowPlaying,
          popular,
          topRated,
          upcoming,
          stateUser,
          dispatch
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
