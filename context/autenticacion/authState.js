import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { useRouter } from 'next/router';

import {
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';

const AuthState = (props) => {
	const router = useRouter();

	const initialState = {
		token: null,
		autenticado: false,
		usuario: null,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// las funciones
	// Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			tokenAuth(token);
		}

		try {
			const respuesta = await clienteAxios.get(
				'/api/usuarios/usuario-autenticado'
			);

			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data.usuario,
			});
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/usuarios/login', datos);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			usuarioAutenticado();
		} catch (error) {
			const alerta = {
				msg: error.response.data.msj,
				categoria: 'alerta-error',
			};
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
		});
		router.push('/login');
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				cargando: state.cargando,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
