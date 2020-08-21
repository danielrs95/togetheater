import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
// Importamos contexto
import AuthGlobal from "../context/store/AuthGlobal";
// Importamos toast para las notificaciones
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from './View.component.js';
// Declaramos la configuracion afuera del componente para que funcione el toast
toast.configure()

export const NowPlaying = () => {
	const context = useContext(AuthGlobal);
	return(
		<View movies={context.nowPlaying}/>
	)
}

export const Trending = () => {
	const context = useContext(AuthGlobal);
	return(
		<View movies={context.trending}/>
	)
}

export const Popular = () => {
	const context = useContext(AuthGlobal);
	return(
		<View movies={context.popular}/>
	)
}

export const TopRated = () => {
	const context = useContext(AuthGlobal);
	return(
		<View movies={context.topRated}/>
	)
}

export const Upcoming = () => {
	const context = useContext(AuthGlobal);
	return(
		<View movies={context.upcoming}/>
	)
}

